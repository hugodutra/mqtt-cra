import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import * as mqtt from "mqtt/dist/mqtt"; // Note: had to import like this to avoid the error: "Buffer is not defined"

const config = {
  clientId: Math.random().toString(16).substr(2, 8),
  protocol: "wss",
  protocolVersion: 4,
  port: 8884,
  path: "/mqtt",
  clean: true,
  resubscribe: false,
  keepalive: 60,
  reconnectPeriod: 0,
};

export const ClientContext = createContext({
  status: "disconnected",
  client: null,
  subscribe: () => {},
  connect: () => {},
  publish: () => {},
  subscriptions: [],
  messages: [],
});

function ClientContextProvider({ children }) {
  const [client, setClient] = useState(null);
  const [status, setStatus] = useState("disconnected"); // ["disconnected", "connecting", "connected"]
  const [subscriptions, setSubscriptions] = useState([]);
  const [messages, setMessages] = useState([]); // [{ topic, message, qos }]

  const connect = (host, options) => {
    const res = mqtt.connect(`wss:${host}`, { ...config, ...options });
    setClient(res);
  };

  const subscribe = (topic) => {
    client.subscribe({ [topic]: { qos: 1 } }, (err, granted) => {
      if (!err) {
        console.log(`Subscribed to ${topic}`);
        setSubscriptions([...subscriptions, topic]);
        console.log({ granted });
      }
    });
  };

  const publish = (topic, qos, message) => {
    client.publish(topic, message, { qos }, () => {
      setMessages([...messages, { topic, message, qos }]);
    });
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        console.log("connected");
        setStatus("connected");
      });

      client.on("close", () => {
        setStatus("disconnected");
      });

      client.on("error", (err) => {
        console.error("Connection error: ", err);
        setStatus("disconnected");
        client.end();
      });
      client.on("message", (topic, message) => {
        console.log({ topic, message: message.toString() });
      });

      client.on("subscribe", (topic, message) => {
        console.log({ topic, message: message.toString() });
      });
    }
  }, [client]);

  return (
    <ClientContext.Provider
      value={{
        client,
        connect,
        subscribe,
        subscriptions,
        status,
        publish,
        messages,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export default ClientContextProvider;
export const useClientContext = () => useContext(ClientContext);

ClientContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
