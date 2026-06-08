# LuminaryIoTChain 平台愿景 (v1.0)

> **组织**：[github.com/LuminaryIoTChain](https://github.com/LuminaryIoTChain)  
> **定位**：开源、轻量化、AI 驱动的 IoT PaaS — 参考涂鸦生态模式，以更低成本与更强 AI 能力服务硬件厂商。

## 1. 我们要解决什么

| 痛点 | 解决方案 |
|------|----------|
| **硬件厂商缺乏 IoT 能力** | 提供即插即用的 IoT 平台、App 与云服务，无需自建底层系统 |
| **生态碎片化** | 统一协议（MQTT）与云平台，实现不同品牌设备互联互通 |
| **国际化难度高** | 多语言、多区域云服务架构，帮助厂商快速海外布局 |

## 2. 与涂鸦（Tuya）的差异

| 维度 | 涂鸦 | LuminaryIoTChain |
|------|------|------------------|
| 商业模式 | 闭源 SaaS，按设备/流量收费 | **开源可私有化**，部署与许可成本更低 |
| 能力边界 | 以设备管理、场景联动为主 | **AI 驱动**：推理、Agent、链上交易、数据洞察 |
| 开发者生态 | 涂鸦开发者平台 | **BlockyEdu / VibeEdu** AI 辅助接入与实验课程 |
| 数据可视化 | 内置面板 | **DataLuminary DataTalk** 专业 BI 大屏 |
| 远程运维 | 有限 | **VistaRemote** WebRTC 远程桌面 |
| 变现 | 平台抽成 | 设备可接入 **VibeAgent** 区块链 AI 服务市场，设备侧亦可参与链上收益 |

## 3. 三大差异化能力

### 3.1 接入快 — BlockyEdu 赋能工程师

- VibeEdu 提供 ESPHome / MQTT / ThingsBoard 实验课程与 AI 辅导
- 厂商工程师通过 code-app-web 快速完成固件模板与协议对接
- 降低从「硬件样品」到「云端在线」的时间

### 3.2 AI 服务 — 不止设备管理

- DataLuminary：时序分析、异常检测、可视化大屏
- VibeAgent：视觉识别、控制 Agent 订阅与链上结算
- 设备遥测 → AI 推理 → 规则/automation 闭环

### 3.3 区块链交易平台 — 设备也能赚钱

- 设备可将算力/数据/Agent 能力注册到 VibeAgent 市场
- 用户购买 AI 服务；设备拥有者可获得链上分成
- LuminaryIoTChain 编排身份（Logto `sub`）与设备 ID 的映射

## 4. 核心链路

```text
设备（端） ──MQTT──► 物联网平台（大脑） ──API──► 终端 App（展示）
                         │
                         ├── ThingsBoard CE（设备影子、规则、多租户）
                         ├── DataLuminary DataTalk（图表 / 大屏）
                         ├── VibeAgent（AI 服务 / 链上交易）
                         ├── VibeEdu（开发者接入）
                         └── VistaRemote（远程运维）
```

## 5. 开源与收费策略（原则）

- **核心平台**（ThingsBoard CE、EMQX OSS、LuminaryIoTChain 编排层）— Apache / MIT 可私有化
- **增值能力**（托管云、AI 推理配额、链上 Gas 代付、企业 SLA）— 低于涂鸦同等量级报价
- **不锁定厂商**：标准 MQTT + REST API，可随时迁出

## 6. 关联规格

| 文档 | 说明 |
|------|------|
| [architecture.md](./architecture.md) | 四层技术架构（Edge / Pipe / Brain / Client） |
| [device-domain.md](./device-domain.md) | 设备域 API |
| [../DataLuminary/DataLuminary-Platform/spec/luminary-iot-chain-overview.md](../DataLuminary/DataLuminary-Platform/spec/luminary-iot-chain-overview.md) | LuminaryWorks 生态总览 |
