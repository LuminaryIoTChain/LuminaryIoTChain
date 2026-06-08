import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD } from "@nestjs/core";
import { LuminaryAuthModule, LuminaryJwtAuthGuard } from "@luminaryworks/auth-core";
import { DeviceModule } from "./modules/device/device.module";
import { MqttModule } from "./modules/mqtt/mqtt.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LuminaryAuthModule.forRootAsync({
      mode: process.env.IDP_ISSUER ? "logto" : "legacy",
      issuer: process.env.IDP_ISSUER,
      audience: process.env.IDP_AUDIENCE,
      legacyJwtSecret: process.env.JWT_SECRET ?? "dev-iot-jwt-fallback",
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST ?? "127.0.0.1",
      port: Number(process.env.DB_PORT ?? 5434),
      username: process.env.DB_USER ?? "iot",
      password: process.env.DB_PASSWORD ?? "iot_dev_password",
      database: process.env.DB_NAME ?? "iot_core",
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: true,
      migrations: ["dist/migrations/*.js"],
    }),
    DeviceModule,
    MqttModule,
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: LuminaryJwtAuthGuard }],
})
export class AppModule {}
