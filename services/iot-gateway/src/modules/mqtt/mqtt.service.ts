import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { connect, type MqttClient } from "mqtt";
import { DeviceService } from "../device/device.service";
import type { DeviceStatus } from "../device/device.entity";

const PRESENCE_TOPIC = "iot/v1/+/presence";
const TELEMETRY_TOPIC = "iot/v1/+/telemetry";

type PresencePayload = { status?: DeviceStatus };

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MqttService.name);
  private client: MqttClient | null = null;
  private connected = false;

  constructor(private readonly devices: DeviceService) {}

  isConnected() {
    return this.connected;
  }

  async onModuleInit() {
    if (process.env.MQTT_ENABLED === "false") {
      this.logger.warn("MQTT disabled (MQTT_ENABLED=false)");
      return;
    }

    const url = process.env.MQTT_URL ?? "mqtt://127.0.0.1:1883";
    const clientId = process.env.MQTT_CLIENT_ID ?? `iot-gateway-${process.pid}`;

    this.client = connect(url, {
      clientId,
      clean: true,
      reconnectPeriod: 5_000,
    });

    this.client.on("connect", () => {
      this.connected = true;
      this.logger.log(`MQTT connected (${url})`);
      this.client?.subscribe([PRESENCE_TOPIC, TELEMETRY_TOPIC], (err) => {
        if (err) {
          this.logger.error(`MQTT subscribe failed: ${err.message}`);
          return;
        }
        this.logger.log(`Subscribed: ${PRESENCE_TOPIC}, ${TELEMETRY_TOPIC}`);
      });
    });

    this.client.on("reconnect", () => {
      this.connected = false;
      this.logger.warn("MQTT reconnecting…");
    });

    this.client.on("close", () => {
      this.connected = false;
    });

    this.client.on("error", (err) => {
      this.logger.error(`MQTT error: ${err.message}`);
    });

    this.client.on("message", (topic, payload) => {
      void this.handleMessage(topic, payload.toString());
    });
  }

  async onModuleDestroy() {
    if (!this.client) return;
    await new Promise<void>((resolve) => {
      this.client?.end(false, {}, () => resolve());
    });
    this.client = null;
    this.connected = false;
  }

  private async handleMessage(topic: string, raw: string) {
    const parts = topic.split("/");
    const deviceId = parts[2];
    if (!deviceId) return;

    if (topic.endsWith("/presence")) {
      await this.handlePresence(deviceId, raw);
      return;
    }

    if (topic.endsWith("/telemetry")) {
      this.logger.debug(`telemetry ${deviceId}: ${raw.slice(0, 200)}`);
    }
  }

  private async handlePresence(deviceId: string, raw: string) {
    let status: DeviceStatus | undefined;
    try {
      const parsed = JSON.parse(raw) as PresencePayload;
      status = parsed.status;
    } catch {
      const normalized = raw.trim().toLowerCase();
      if (normalized === "online" || normalized === "offline") {
        status = normalized;
      }
    }

    if (status !== "online" && status !== "offline") {
      this.logger.warn(`Invalid presence payload for ${deviceId}: ${raw}`);
      return;
    }

    const updated = await this.devices.updateStatus(deviceId, status);
    if (updated) {
      this.logger.log(`Device ${deviceId} → ${status}`);
    } else {
      this.logger.debug(`Presence for unknown device ${deviceId}`);
    }
  }
}
