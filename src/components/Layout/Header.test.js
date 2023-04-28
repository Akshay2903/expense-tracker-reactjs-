import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import store from "../store";

describe("Header", () => {
  it("should render Login link if user is not authenticated", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByText(/login/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("should render Welcome message and Logout button if user is authenticated", () => {
    const fakeAuthState = { isAuthenticated: true };
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
      { initialState: { auth: fakeAuthState } }
    );
    const welcomeMessage = screen.getByText(/welcome to expense tracker/i);
    const logoutButton = screen.getByText(/logout/i);
    expect(welcomeMessage).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it("should logout the user when Logout button is clicked", () => {
    const fakeAuthState = { isAuthenticated: true };
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
      { initialState: { auth: fakeAuthState } }
    );
    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);
    const linkElement = screen.getByText(/login/i);
    expect(linkElement).toBeInTheDocument();
  });
});
