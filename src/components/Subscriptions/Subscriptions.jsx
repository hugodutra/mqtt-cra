import { Button, Form, Input, List, Typography } from "antd";
import { useClientContext } from "../../helpers/ClientContext";

export default function Subscriptions() {
  const { subscribe, subscriptions } = useClientContext();

  const handleSubscribe = (values) => {
    subscribe(values.subscriptions);
  };

  return (
    <>
      <Typography.Title level={2}>Subscriptions</Typography.Title>

      <Form onFinish={handleSubscribe}>
        <Form.Item
          name="subscriptions"
          rules={[
            { required: true, message: "Please input your subscription name!" },
          ]}
        >
          <Input placeholder="topic/subscription/abc" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Subscribe
          </Button>
        </Form.Item>
      </Form>

      {subscriptions.length > 0 && (
        <List
          size="small"
          dataSource={subscriptions}
          bordered
          renderItem={(sub) => <List.Item>✔️ {sub}</List.Item>}
        />
      )}
    </>
  );
}
