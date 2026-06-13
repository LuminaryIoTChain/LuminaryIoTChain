# LuminaryIoTChain 仓库拆解计划

> **目标**：与 BlockyEdu / VistaRemote / DataLuminary 对齐 — **公开 docs**，**私有** MetaRepo + 前端 + 后端 + 部署。  
> **状态**：规划中（IoT-M3 前完成骨架）

## 现状 vs 目标

| 维度 | 现状（单仓） | 目标（多仓，对齐四产品） |
|------|-------------|-------------------------|
| MetaRepo | `LuminaryIoTChain/LuminaryIoTChain` 含 `services/*` | MetaRepo 仅 spec/plan/contracts/tooling |
| 文档 | `docs/` 在 MetaRepo 内 | **`LuminaryIoTChain/docs` 公开 RsPress** |
| 后端 | `services/iot-gateway/` | **`LuminaryIoTChain/iot-gateway` 私有仓** |
| 前端 | `services/iot-console-web/` | **`LuminaryIoTChain/iot-console-web` 私有仓** |
| 部署 | `deploy/` | **`LuminaryIoTChain/deploy` 私有仓**（可选） |
| 初始化 | 无 `init.sh` | `init.ps1` / `init.sh` 拉子仓 |

参考范本：[BlockyEdu/VibeEdu — 仓库模型 v3.1](https://github.com/BlockyEdu/VibeEdu#仓库模型-v31--10-仓)

## 目标仓库清单

| 仓库 | 可见性 | 职责 |
|------|--------|------|
| `docs` | **Public** | 产品说明、快速开始、MQTT 接入指南 |
| `LuminaryIoTChain` | Private | MetaRepo：spec、plan、contracts、playbooks |
| `iot-gateway` | Private | NestJS 编排层（JWT、PAL、TB 代理） |
| `iot-console-web` | Private | Web 控制台 |
| `deploy` | Private | EMQX / ThingsBoard / PG compose（可从 MetaRepo 迁出） |
| `app-mobile` | Private（规划） | Flutter/RN 模板 |

## 拆解步骤（建议顺序）

### Phase A — 文档与可见性（IoT-M3 前）

1. 创建 **`LuminaryIoTChain/docs`** 公开仓（RsPress），迁移 `docs/ecosystem.md` 等对外内容。
2. MetaRepo 保留 `spec/`（工程规格）、`plan/`（里程碑）。
3. 添加 [playbooks/repository-visibility-policy.md](../playbooks/repository-visibility-policy.md)。

### Phase B — 子仓独立 Git（IoT-M3）

1. `git subtree split` 或新建仓 + 迁移历史：`services/iot-gateway` → `iot-gateway`。
2. 同理 `iot-console-web`；MetaRepo `init.sh` 克隆到 `services/` 或平级目录（与 VistaRemote 一致）。
3. 更新 CI：各子仓独立 workflow（GitHub Packages 已配置）。

### Phase C — 部署与移动端（IoT-M4+）

1. `deploy/` → 独立 `deploy` 仓或保留 MetaRepo（与 VistaRemote 策略二选一）。
2. `app-mobile` 新仓。

## MetaRepo 目录（拆解后）

```text
LuminaryIoTChain/                 # MetaRepo（私有）
├── spec/                         # 工程规格
├── plan/                         # 里程碑 IoT-M0～M5
├── contracts/                    # OpenAPI
├── playbooks/                    # 可见性、上仓清单
├── tooling/                      # 共享脚本
├── init.sh / init.ps1            # 拉取 iot-gateway、iot-console-web、docs
├── ONBOARDING.md
└── services/                     # 本地开发占位（git clone 目标，不提交源码）
    ├── iot-gateway/              # → github.com/syncrobrain/iot-gateway
    └── iot-console-web/          # → github.com/syncrobrain/iot-console-web
```

## 与统一登录 / PostgreSQL

- 各子仓 `package.json`：`@luminaryworks/auth-core@^0.2.0`
- iot-gateway OLTP：**PostgreSQL** `:5434`（见 [datastore-strategy](https://github.com/DataLuminary/DataLuminary-Platform/blob/main/spec/datastore-strategy.md)）
- 公开 docs 说明 OIDC 接入，不暴露私有 compose 密钥

## 验收

- [ ] 新人仅读公开 `docs` + MetaRepo `ONBOARDING.md` 可完成 gateway + console 本地启动
- [ ] MetaRepo 不含业务源码提交（仅 submodule 式 clone 目录或 init 脚本）
- [ ] 与 BlockyEdu「docs 公开、代码私有」策略一致
