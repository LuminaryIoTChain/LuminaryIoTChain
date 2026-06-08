import { Button, Result, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth-context";

export function AuthCallbackPage() {
  const { completeCallback } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    void completeCallback()
      .then(() => navigate("/", { replace: true }))
      .catch((e) => setError(e instanceof Error ? e.message : "登录失败"));
  }, [completeCallback, navigate]);

  if (error) {
    return (
      <Result
        status="error"
        title="登录失败"
        subTitle={error}
        extra={
          <Button type="primary" onClick={() => navigate("/login", { replace: true })}>
            返回
          </Button>
        }
      />
    );
  }

  return <Spin tip="正在登录…" fullscreen />;
}
