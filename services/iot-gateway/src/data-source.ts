import "dotenv/config";
import { DataSource } from "typeorm";

const isTs = typeof __filename !== "undefined" && __filename.endsWith(".ts");

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST ?? "127.0.0.1",
  port: Number(process.env.DB_PORT ?? 5434),
  username: process.env.DB_USER ?? "iot",
  password: process.env.DB_PASSWORD ?? "iot_dev_password",
  database: process.env.DB_NAME ?? "iot_core",
  entities: isTs
    ? ["src/**/*.entity.ts"]
    : ["dist/**/*.entity.js"],
  migrations: isTs
    ? ["src/migrations/*.ts"]
    : ["dist/migrations/*.js"],
  migrationsTableName: "migrations",
});
