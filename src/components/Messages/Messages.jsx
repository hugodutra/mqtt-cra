import { Form, Input, Select, Button, Table, Typography, Row, Col } from "antd";
import { useClientContext } from "../../helpers/ClientContext";
const { Option } = Select;

export default function Messages() {
  const { messages, publish } = useClientContext();
  const handlePublish = ({ topic, qos, message }) => {
    console.log({ topic, qos, message });
    publish(topic, qos, message);
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const renderMessages = () => (
    <Table
      rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
      columns={[
        { title: "Message", dataIndex: "message" },
        { title: "Topic", dataIndex: "topic" },
        { title: "QoS", dataIndex: "qos" },
      ]}
      dataSource={messages}
      rowKey={(record) => record.message}
    />
  );
  return (
    <>
      <Typography.Title level={2}>Messages</Typography.Title>

      <Form onFinish={handlePublish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="topic"
              rules={[
                { required: true, message: "Please input your topic name!" },
              ]}
            >
              <Input placeholder="Topic" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="qos">
              <Select placeholder="Quality of Service (QoS)">
                <Option value={0}>0</Option>
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Please input your message!" }]}
        >
          <Input.TextArea placeholder="message body" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Publish Message
          </Button>
        </Form.Item>
      </Form>

      {messages.length > 0 && renderMessages()}
    </>
  );
}
