import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/auth-context";

// 生态统一主题（见 LuminaryWorks/shared/brand/ant-theme.ts）
const luminaryAntTheme = {
  token: { colorPrimary: "#1677ff", colorError: "#ea3636", borderRadius: 8 },
};
import { AuthCallbackPage } from "./pages/AuthCallbackPage";
import { ConsolePage } from "./pages/ConsolePage";
import { LoginPage } from "./pages/LoginPage";

function Protected({ children }: { children: React.ReactNode }) {
  const { ready, authenticated } = useAuth();
  if (!ready) return null;
  if (!authenticated) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route
          path="/"
          element={
            <Protected>
              <ConsolePage />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN} theme={luminaryAntTheme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ConfigProvider>
  </StrictMode>,
);
