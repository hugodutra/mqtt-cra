import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useClientContext } from "../../helpers/ClientContext";
import { useState } from "react";

export default function Connection() {
  const { connect, client } = useClientContext();
  const [hostname, setHostname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleConnect = (values) => {
    connect(hostname, { username, password });
  };

  const renderForm = () => (
    <Form onFinish={handleConnect}>
      <Form.Item
        name="hostname"
        rules={[{ required: true, message: "Please input your hostname!" }]}
      >
        <Input
          addonBefore="mqtt:"
          data-testid="hostname"
          onChange={(e) => setHostname(e.target.value)}
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              data-testid="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              data-testid="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleConnect}>
          Connect
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <>
      <Typography.Title level={2}>Connection</Typography.Title>

      {client?.connected ? (
        <p>
          Connected to {client.options.hostname} as {client.options.username}
        </p>
      ) : (
        renderForm()
      )}
    </>
  );
}
