import { Col, Row, Typography } from "antd";
import { Connection } from "./components/Connection";
import { Subscriptions } from "./components/Subscriptions";

import ClientContextProvider from "./helpers/ClientContext";
import { Messages } from "./components/Messages";

function App() {
  return (
    <ClientContextProvider>
      <Typography.Title level={1}>MQTT WebClient</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <Connection />
          <Subscriptions />
        </Col>
        <Col span={12} offset={2}>
          <Messages />
        </Col>
      </Row>
    </ClientContextProvider>
  );
}

export default App;
