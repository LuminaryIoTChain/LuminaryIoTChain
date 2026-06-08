import { AppstoreOutlined, CloudOutlined, CodeOutlined, DesktopOutlined } from "@ant-design/icons";
import { Button, Card, Col, Layout, Row, Space, Table, Tag, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../lib/auth-context";
import { type Device, createDevice, fetchDevices, healthCheck } from "../lib/api";

const { Header, Content } = Layout;

const ecosystemLinks = [
  {
    title: "DataLuminary",
    desc: "数据洞察 / 监控大屏",
    icon: <CloudOutlined />,
    href: import.meta.env.VITE_LINK_DATALUMINARY ?? "http://localhost:3003",
  },
  {
    title: "VibeEdu",
    desc: "物联网课程 / 实验",
    icon: <CodeOutlined />,
    href: import.meta.env.VITE_LINK_VIBEEDU ?? "http://localhost:18082",
  },
  {
    title: "VibeAgent",
    desc: "Agent 市场",
    icon: <AppstoreOutlined />,
    href: import.meta.env.VITE_LINK_VIBEAGENT ?? "http://localhost:5174",
  },
  {
    title: "VistaRemote",
    desc: "远程运维",
    icon: <DesktopOutlined />,
    href: import.meta.env.VITE_LINK_VISTAREMOTE ?? "http://localhost:5175",
  },
];

export function ConsolePage() {
  const { logout } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [gatewayOk, setGatewayOk] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([fetchDevices(), healthCheck()])
      .then(([list, health]) => {
        setDevices(list);
        setGatewayOk(health.status === "ok");
      })
      .catch((e) => message.error(e instanceof Error ? e.message : "加载失败"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const onRegisterDemo = () => {
    void createDevice({ name: `demo-sensor-${Date.now()}`, protocol: "mqtt" })
      .then(() => {
        message.success("设备已注册");
        load();
      })
      .catch((e) => message.error(e instanceof Error ? e.message : "注册失败"));
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center", color: "#fff" }}>
        <Typography.Title level={4} style={{ color: "#fff", margin: 0, flex: 1 }}>
          LuminaryIoTChain
        </Typography.Title>
        <Space>
          <Typography.Text style={{ color: "#ccc" }}>
            Gateway {gatewayOk ? "在线" : "离线"}
          </Typography.Text>
          <Button size="small" onClick={() => void logout()}>
            退出
          </Button>
        </Space>
      </Header>
      <Content style={{ padding: 24, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <Typography.Title level={5}>生态能力</Typography.Title>
        <Row gutter={[16, 16]}>
          {ecosystemLinks.map((item) => (
            <Col xs={24} sm={12} md={6} key={item.title}>
              <Card
                hoverable
                onClick={() => window.open(item.href, "_blank")}
                style={{ cursor: "pointer" }}
              >
                <Space>
                  {item.icon}
                  <div>
                    <Typography.Text strong>{item.title}</Typography.Text>
                    <br />
                    <Typography.Text type="secondary">{item.desc}</Typography.Text>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        <Typography.Title level={5} style={{ marginTop: 32 }}>
          设备
        </Typography.Title>
        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={onRegisterDemo}>
            注册演示设备
          </Button>
          <Button onClick={load}>刷新</Button>
        </Space>
        <Table
          rowKey="id"
          loading={loading}
          dataSource={devices}
          pagination={false}
          columns={[
            { title: "名称", dataIndex: "name" },
            { title: "协议", dataIndex: "protocol" },
            {
              title: "状态",
              dataIndex: "status",
              render: (status: string) => (
                <Tag color={status === "online" ? "green" : status === "disabled" ? "default" : "red"}>
                  {status}
                </Tag>
              ),
            },
            { title: "创建时间", dataIndex: "createdAt" },
          ]}
        />
      </Content>
    </Layout>
  );
}
