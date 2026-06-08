import { Controller, Get } from "@nestjs/common";
import { LuminaryPublic } from "@luminaryworks/auth-core";
import { MqttService } from "./modules/mqtt/mqtt.service";

@Controller("health")
export class HealthController {
  constructor(private readonly mqtt: MqttService) {}

  @LuminaryPublic()
  @Get()
  health() {
    return {
      status: "ok",
      service: "iot-gateway",
      version: "0.1.0",
      mqtt: this.mqtt.isConnected() ? "connected" : "disconnected",
    };
  }
}
