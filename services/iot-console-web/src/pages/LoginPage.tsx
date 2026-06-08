import { Button, Card, Typography } from "antd";
import { useAuth } from "../lib/auth-context";

export function LoginPage() {
  const { login } = useAuth();

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Card style={{ width: 400 }}>
        <Typography.Title level={4}>LuminaryIoTChain</Typography.Title>
        <Typography.Paragraph type="secondary">
          物联网控制台 — 统一 Logto 登录，串联 DataLuminary / VibeEdu / VibeAgent / VistaRemote。
        </Typography.Paragraph>
        <Button type="primary" block onClick={() => void login()}>
          统一登录
        </Button>
      </Card>
    </div>
  );
}
