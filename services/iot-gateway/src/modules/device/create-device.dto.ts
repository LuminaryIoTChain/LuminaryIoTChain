import { IsEnum, IsObject, IsOptional, IsString, MinLength } from "class-validator";
import type { DeviceProtocol } from "./device.entity";

export class CreateDeviceDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsEnum(["mqtt", "modbus", "http"])
  protocol!: DeviceProtocol;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
