# LuminaryIoTChain

开源、轻量化、**AI 驱动**的 IoT PaaS 平台 — 参考涂鸦生态，以更低成本为硬件厂商提供即插即用的云平台、App 与 AI 服务。

> **组织**：[github.com/LuminaryIoTChain](https://github.com/LuminaryIoTChain)  
> **核心链路**：设备（端）→ MQTT（管道）→ 物联网平台（大脑）→ 终端 App（展示）

## 解决什么问题

| 痛点 | 方案 |
|------|------|
| 硬件厂商缺乏 IoT 能力 | 开源 PaaS + App 模板，无需自建底层 |
| 生态碎片化 | 统一 MQTT + ThingsBoard 多租户 |
| 国际化难 | 多语言、多区域部署架构 |
| 涂鸦仅设备管理 | **AI 推理 + VibeAgent 链上交易 + DataTalk 大屏** |
| 接入门槛高 | **VibeEdu / BlockyEdu** AI 辅助工程师快速对接 |

详见 [`spec/platform-vision.md`](./spec/platform-vision.md) · [`spec/architecture.md`](./spec/architecture.md) · [`spec/ecosystem.md`](./spec/ecosystem.md)

> **LuminaryWorks**：[五产品 AI 生态叙事](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/docs/ecosystem-narrative.md)

## 四层架构

| 层 | 选型 | 职责 |
|----|------|------|
| **Edge** | ESPHome / Tasmota | 硬件标准化、OTA |
| **Pipe** | EMQX (OSS) | 高并发 MQTT（dev 用 Mosquitto POC） |
| **Brain** | ThingsBoard CE + iot-gateway | 设备影子、规则引擎；LuminaryWorks 生态编排 |
| **Client** | Flutter/RN + iot-console-web | 控制监控；**DataTalk** 专业图表 |

## 仓库结构

```text
LuminaryIoTChain/              # MetaRepo（私有；拆解中）
├── spec/                      # 工程规格
├── plan/                      # 里程碑 + repository-split.md
├── playbooks/                 # 可见性策略
├── contracts/                 # OpenAPI
├── ONBOARDING.md              # 新人上手
├── init.ps1 / init.sh         # 拉取子仓（拆解后）
├── services/                  # 过渡期：gateway + console（规划独立私有仓）
│   ├── iot-gateway/
│   └── iot-console-web/
├── deploy/                    # PG :5434 · MQTT compose
└── docs/                      # 对外文档（规划 → 公开 docs 仓）
```

| 可见性 | 仓库 |
|--------|------|
| **Public**（规划） | `LuminaryIoTChain/docs` |
| **Private** | MetaRepo、iot-gateway、iot-console-web、deploy |

新人上手详见 [ONBOARDING.md](./ONBOARDING.md)。仓库拆解计划：[plan/repository-split.md](./plan/repository-split.md)。

## 快速开始（M2 dev）

```powershell
# 统一登录 + 共享库
cd ..\LuminaryWorks\identity && .\bootstrap.ps1
cd ..\LuminaryWorks\shared && pnpm install && pnpm build

# IoT 基础设施（M2: Mosquitto；M3 切换 EMQX + ThingsBoard）
cd D:\www\LuminaryIoTChain\deploy
docker compose -f docker-compose.dev.yml up -d

# Gateway :13100 · Console :5180
cd ..\services\iot-gateway
copy .npmrc.example .npmrc
copy .env.example .env
pnpm install --no-frozen-lockfile && pnpm dev

cd ..\iot-console-web
copy .env.development.example .env.development
pnpm install && pnpm dev
```

Logto 注册 Application **iot-console-web**，Redirect: `http://localhost:5180/auth/callback`

## LuminaryWorks 生态

| 项目 | 在 IoT 场景的角色 |
|------|------------------|
| [DataLuminary](https://github.com/DataLuminary/DataLuminary-Platform) | DataTalk 图表 / AI 数据洞察 |
| [VibeEdu](https://github.com/BlockyEdu/VibeEdu) | 工程师接入实验与 AI 辅导 |
| [VibeAgent](https://github.com/AgentSkillMesh/VibeAgent) | AI 服务与链上交易平台 |
| [VistaRemote](https://github.com/VistaRemote) | 设备远程运维 WebRTC |

## 文档

| 文档 | 说明 |
|------|------|
| [spec/platform-vision.md](./spec/platform-vision.md) | 平台愿景 |
| [spec/architecture.md](./spec/architecture.md) | 四层架构 |
| [spec/ecosystem.md](./spec/ecosystem.md) | 工程规格 — LuminaryWorks 角色 |
| [docs/ecosystem.md](./docs/ecosystem.md) | **对外** — 生态说明 |
| [plan/README.md](./plan/README.md) | 里程碑 |

## LuminaryWorks

五产品可独立、可组合。叙事主仓：[LuminaryWorks/LuminaryWorks](https://github.com/LuminaryWorks/LuminaryWorks)

## 许可

核心编排层 Apache-2.0（待补充）；ThingsBoard CE / EMQX 遵循各自开源协议。
