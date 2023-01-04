import { render, screen, fireEvent } from "../test-util";
import Login from "../../../pages/login/login";

describe("Login page", () => {
  it("should render login page, button should be disabled if inputs have no value", () => {
    render(<Login />);

    const button = screen.getByRole("button", {
      name: /Log in/,
    });

    const email = screen.getByRole("textbox", {
      name: /Email/,
    });

    const password = screen.getByLabelText(/Password/);

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();

    fireEvent.change(email, { target: { value: "testEmail" } });
    expect(button).toBeDisabled();

    fireEvent.change(password, { target: { value: "testPassword" } });
    expect(button).toBeEnabled();
  });
});
