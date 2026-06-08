# 统一登录（LuminaryWorks Identity）

## 启动

```powershell
cd D:\www\LuminaryWorks\identity
.\bootstrap.ps1
```

## iot-console-web

```env
VITE_IDP_ISSUER=http://localhost:3001/oidc
VITE_IDP_CLIENT_ID=<iot-console-web App ID>
VITE_IDP_REDIRECT_URI=http://localhost:5180/auth/callback
```

## iot-gateway

```env
IDP_ISSUER=http://localhost:3001/oidc
```

依赖 `@luminary/auth-core`（构建顺序：先 `LuminaryWorks/shared` 或 DataLuminary `packages/luminary-auth-core`）。

详见 [LuminaryWorks 统一登录接入](https://github.com/LuminaryWorks/docs/blob/main/docs/develop/unified-login.md)。
