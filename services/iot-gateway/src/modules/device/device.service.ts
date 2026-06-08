import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDeviceDto } from "./create-device.dto";
import { DeviceEntity, type DeviceStatus } from "./device.entity";

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly devices: Repository<DeviceEntity>,
  ) {}

  list() {
    return this.devices.find({ order: { createdAt: "DESC" } });
  }

  findOne(id: string) {
    return this.devices.findOne({ where: { id } });
  }

  create(dto: CreateDeviceDto, externalUserId?: string) {
    return this.devices.save(
      this.devices.create({
        name: dto.name,
        protocol: dto.protocol,
        metadata: dto.metadata ?? null,
        externalUserId: externalUserId ?? null,
        status: "offline",
      }),
    );
  }

  async updateStatus(id: string, status: DeviceStatus) {
    const device = await this.devices.findOne({ where: { id } });
    if (!device || device.status === "disabled") return null;
    device.status = status;
    return this.devices.save(device);
  }
}
