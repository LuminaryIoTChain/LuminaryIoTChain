# LuminaryIoTChain 新人上手

> 生态通用步骤：[LuminaryWorks/docs — 新人上手](https://github.com/LuminaryWorks/docs/blob/main/docs/develop/onboarding.md)  
> 仓库拆解计划：[plan/repository-split.md](./plan/repository-split.md)

## 仓库模型（过渡期）

当前业务代码在 MetaRepo `services/` 下；规划拆为独立私有仓（与 BlockyEdu 对齐）。**对外文档**将迁至公开仓 `LuminaryIoTChain/docs`。

| 目录 / 仓 | 说明 |
|-----------|------|
| `spec/` | 工程规格（私有 MetaRepo） |
| `services/iot-gateway` | NestJS 后端（规划 → `iot-gateway` 仓） |
| `services/iot-console-web` | Web 控制台（规划 → `iot-console-web` 仓） |
| `deploy/` | Docker compose（PG、Mosquitto/EMQX） |
| `docs/` | 对外说明（规划 → 公开 `docs` 仓） |

## 快速开始

### 1. 生态依赖

```powershell
cd D:\www\LuminaryWorks\identity
.\bootstrap.ps1

cd D:\www\LuminaryWorks\shared
pnpm install && pnpm build
```

### 2. 基础设施

```powershell
cd D:\www\LuminaryIoTChain\deploy
docker compose -f docker-compose.dev.yml up -d
# PostgreSQL :5434 · Mosquitto :1883
```

### 3. iot-gateway（后端）

```powershell
cd D:\www\LuminaryIoTChain\services\iot-gateway
copy .npmrc.example .npmrc   # 配置 NODE_AUTH_TOKEN 或 file: 到 shared
copy .env.example .env
pnpm install --no-frozen-lockfile
pnpm dev
# http://localhost:13100
```

`.env` 关键项：`IDP_ISSUER` · `DB_HOST`/`DB_PORT`（PostgreSQL :5434）· `pnpm migration:run` 建表

### 4. iot-console-web（前端）

```powershell
cd D:\www\LuminaryIoTChain\services\iot-console-web
copy .env.development.example .env.development
pnpm install && pnpm dev
# http://localhost:5180
```

Logto 注册 Redirect：`http://localhost:5180/auth/callback`

## 在 MetaRepo vs 子目录开发

| 场景 | 做法 |
|------|------|
| 改规格 / 里程碑 | MetaRepo `spec/` `plan/` |
| 只改 gateway | `services/iot-gateway`（未来独立 clone） |
| 只改控制台 | `services/iot-console-web` |
| 写对外教程 | `docs/` → 将来 `LuminaryIoTChain/docs` 公开仓 |

拆解完成后运行 `./init.ps1` 拉取各子仓到固定路径。

## 数据存储

- **OLTP**：PostgreSQL（`iot-gateway`）— 与 DataLuminary / Logto 同栈，见 [为何 PostgreSQL](https://github.com/LuminaryWorks/docs/blob/main/docs/develop/datastore.md)
- **时序**：ClickHouse（IoT-M5 规划）

## 统一登录

后端：`@luminaryworks/auth-core` + 全局 `LuminaryJwtAuthGuard`  
前端：`services/iot-console-web/src/lib/idp.ts`（PKCE）

路线图：[identity-roadmap](https://github.com/LuminaryWorks/docs/blob/main/docs/develop/identity-roadmap.md)
