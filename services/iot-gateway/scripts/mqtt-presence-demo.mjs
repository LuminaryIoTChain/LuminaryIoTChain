/**
 * Publish device presence to the dev Mosquitto broker.
 *
 * Usage:
 *   npm run mqtt:presence -- <device-uuid> online|offline
 *   npm run mqtt:presence -- <device-uuid> telemetry '{"temp":23.5}'
 */
import { connect } from "mqtt";

const [, , deviceId, action = "online", payloadArg] = process.argv;

if (!deviceId) {
  console.error("Usage: npm run mqtt:presence -- <device-uuid> [online|offline|telemetry] [json]");
  process.exit(1);
}

const url = process.env.MQTT_URL ?? "mqtt://127.0.0.1:1883";
const client = connect(url, { clientId: `demo-${Date.now()}` });

client.on("connect", () => {
  if (action === "telemetry") {
    const topic = `iot/v1/${deviceId}/telemetry`;
    const body = payloadArg ?? JSON.stringify({ temp: 23.5, ts: Date.now() });
    client.publish(topic, body, () => {
      console.log(`Published ${topic}: ${body}`);
      client.end();
    });
    return;
  }

  const status = action === "offline" ? "offline" : "online";
  const topic = `iot/v1/${deviceId}/presence`;
  const body = JSON.stringify({ status });
  client.publish(topic, body, () => {
    console.log(`Published ${topic}: ${body}`);
    client.end();
  });
});

client.on("error", (err) => {
  console.error(err.message);
  process.exit(1);
});
