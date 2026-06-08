import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export type DeviceProtocol = "mqtt" | "modbus" | "http";
export type DeviceStatus = "online" | "offline" | "disabled";

@Entity("devices")
export class DeviceEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", nullable: true })
  tenantId!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  externalUserId!: string | null;

  @Column()
  name!: string;

  @Column({ type: "varchar", length: 20, default: "mqtt" })
  protocol!: DeviceProtocol;

  @Column({ type: "varchar", length: 20, default: "offline" })
  status!: DeviceStatus;

  @Column({ type: "jsonb", nullable: true })
  metadata!: Record<string, unknown> | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
