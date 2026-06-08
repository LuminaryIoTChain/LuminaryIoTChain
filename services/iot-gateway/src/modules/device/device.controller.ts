import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
} from "@nestjs/common";
import type { LuminaryAuthenticatedUser } from "@luminaryworks/auth-core";
import { CreateDeviceDto } from "./create-device.dto";
import { DeviceService } from "./device.service";

type AuthRequest = { user?: LuminaryAuthenticatedUser };

@Controller("devices")
export class DeviceController {
  constructor(private readonly devices: DeviceService) {}

  @Get()
  list() {
    return this.devices.list();
  }

  @Get(":id")
  async getOne(@Param("id") id: string) {
    const device = await this.devices.findOne(id);
    if (!device) throw new NotFoundException("Device not found");
    return device;
  }

  @Post()
  create(@Body() dto: CreateDeviceDto, @Req() req: AuthRequest) {
    return this.devices.create(dto, req.user?.sub);
  }
}
