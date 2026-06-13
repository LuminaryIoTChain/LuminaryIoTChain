# SyncroBrain 与 LuminaryWorks 生态

> **品牌**：SyncroBrain · **中文名**：万物智脑  
> **组织**：[github.com/syncrobrain](https://github.com/syncrobrain) · **域名**：[syncrobrain.com](https://syncrobrain.com)

规划摘要：[LuminaryWorks/spec/products/syncrobrain.md](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/products/syncrobrain.md)

## 独立价值

厂商可**仅部署 SyncroBrain**：EMQX + ThingsBoard + 控制台 + App 模板，获得不输涂鸦核心能力的开源私有化方案，无需购买 DataLuminary 或 DoerFlow。

## 在 AI 生态中的角色

| 维度 | 说明 |
|------|------|
| **连接** | 物理设备与云端的 MQTT 管道与多租户大脑 |
| **编排** | iot-console 聚合跳转，不复制兄弟产品业务代码 |
| **AI 差异化** | 对比涂鸦：叠加 DataTalk 大屏、DoerFlow 链上 AI、BlockyEdu 接入辅导 |

```text
Edge ──MQTT──► SyncroBrain ──► 可选：DataLuminary / DoerFlow / VistaRemote / VistaCast / BlockyEdu
```

## 兄弟产品

| 产品 | 在 IoT 场景 |
|------|------------|
| [DataLuminary](https://github.com/dataluminary/platform) | DataTalk 设备监控大屏 |
| [BlockyEdu](https://github.com/blockyedu/platform) | ESPHome/MQTT 实验课、工程师 AI 辅导 |
| [DoerFlow](https://github.com/doerflow/platform) | 设备 Agent 市场与链上收益 |
| [VistaRemote](https://github.com/VistaRemote/vibeCode) | 设备远程桌面运维 |
| [VistaCast](https://github.com/VistaCast/vistacast) | 摄像头 AI 告警（规划） |

## 生态文档

- [LuminaryWorks 域名与品牌](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/domain-and-branding.md)
- [LuminaryWorks 叙事](https://github.com/LuminaryWorks/docs)
- 本仓愿景：[spec/platform-vision.md](./platform-vision.md)

## 原则

- 登录走 LuminaryWorks 共享 Logto + `@luminary/auth-core`  
- 图表**首选 DataTalk**，ThingsBoard Widget 非主路径

> 历史品牌 **LuminaryIoTChain** 指同一产品，已升级为 **SyncroBrain**。
