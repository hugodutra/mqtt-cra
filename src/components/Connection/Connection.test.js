import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Connection from "./Connection";
import * as ClientContext from "../../helpers/ClientContext";

delete window.matchMedia;
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

const context = {
  client: null,
  connect: jest.fn(),
};

describe("<Connection>", () => {
  it("should trigger connect with correct parameters", () => {
    jest
      .spyOn(ClientContext, "useClientContext")
      .mockImplementation(() => context);

    render(<Connection />);

    const hostnameInput = screen.getByTestId("hostname");
    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");

    fireEvent.change(hostnameInput, { target: { value: "host:address" } });
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "123123" } });

    const connectButton = screen.getByText("Connect");
    fireEvent.click(connectButton);

    expect(context.connect).toHaveBeenCalledWith("host:address", {
      username: "username",
      password: "123123",
    });
  });

  it("should render current conexion data", async () => {
    jest.spyOn(ClientContext, "useClientContext").mockImplementation(() => ({
      connect: jest.fn(),
      client: {
        connected: true,
        options: {
          hostname: "host:address",
          username: "username",
        },
      },
    }));

    render(<Connection />);

    expect(
      await screen.findAllByText("Connected to host:address as username")
    ).toBeTruthy();
  });
});
