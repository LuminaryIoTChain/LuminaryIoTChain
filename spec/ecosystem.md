# LuminaryIoTChain 与 LuminaryWorks 生态

> **组织**：[LuminaryIoTChain](https://github.com/LuminaryIoTChain) · **本仓**：开源 AI 驱动 IoT PaaS

## 独立价值

厂商可**仅部署 LuminaryIoTChain**：EMQX + ThingsBoard + 控制台 + App 模板，获得不输涂鸦核心能力的开源私有化方案，无需购买 DataLuminary 或 VibeAgent。

## 在 AI 生态中的角色

| 维度 | 说明 |
|------|------|
| **连接** | 物理设备与云端的 MQTT 管道与多租户大脑 |
| **编排** | iot-console 聚合跳转，不复制兄弟产品业务代码 |
| **AI 差异化** | 对比涂鸦：叠加 DataTalk 大屏、VibeAgent 链上 AI、VibeEdu 接入辅导 |

```text
Edge ──MQTT──► LuminaryIoTChain ──► 可选：DataLuminary / VibeAgent / VistaRemote / VibeEdu
```

## 兄弟产品

| 产品 | 在 IoT 场景 |
|------|------------|
| [DataLuminary](https://github.com/DataLuminary/DataLuminary-Platform) | DataTalk 设备监控大屏 |
| [VibeEdu](https://github.com/BlockyEdu/VibeEdu) | ESPHome/MQTT 实验课、工程师 AI 辅导 |
| [VibeAgent](https://github.com/AgentSkillMesh/VibeAgent) | 设备 Agent 市场与链上收益 |
| [VistaRemote](https://github.com/VistaRemote/vibeCode) | 设备远程运维 |

## 生态文档

- [LuminaryWorks 叙事](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/docs/ecosystem-narrative.md)
- [总体架构](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/docs/architecture-overview.md)
- 本仓工程规格：[spec/ecosystem.md](./ecosystem.md)
- 本仓对外说明：[docs/ecosystem.md](../docs/ecosystem.md)

## 原则

- 登录走 LuminaryWorks 共享 Logto + `@luminary/auth-core`  
- 图表**首选 DataTalk**，ThingsBoard Widget 非主路径
