import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Expenses from "./Expenses";

describe("Expenses", () => {
  it("renders Expenses component without crashing", () => {
    render(<Expenses />);
    expect(screen.getByTestId("expenses")).toBeInTheDocument();
  });

  it("submits expense data when the submit button is clicked", () => {
    render(<Expenses />);
    const moneyInput = screen.getByLabelText("Money");
    const descriptionInput = screen.getByLabelText("Description");
    const categoryInput = screen.getByLabelText("Category");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(moneyInput, { target: { value: "10" } });
    fireEvent.change(descriptionInput, { target: { value: "Test description" } });
    fireEvent.change(categoryInput, { target: { value: "Test category" } });
    fireEvent.click(submitButton);

    expect(moneyInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(categoryInput).toHaveValue("");
  });
});
