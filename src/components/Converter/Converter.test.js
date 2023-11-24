import { render, fireEvent, screen } from "@testing-library/react";
import Converter from "./Converter";
import { useCurrencyStore } from "../../store/store";

// Mocking the store hook
jest.mock("../../store/store");

const mockCurrenciesData = [
  { ccy: "USD", buy: 1.2 },
  { ccy: "EUR", buy: 1.5 },
];

const mockUseCurrencyStore = useCurrencyStore;

describe("Converter Component", () => {
  beforeEach(() => {
    mockUseCurrencyStore.mockReturnValue({
      currenciesData: mockCurrenciesData,
    });
  });

  it("renders without crashing", () => {
    render(<Converter />);
  });

  it("updates amount state on input change", () => {
    render(<Converter />);
    const amountInput = screen.getByLabelText("Amount");

    fireEvent.change(amountInput, { target: { value: 10 } });

    expect(amountInput).toHaveValue(10);
  });

  it("calculates and displays the result correctly", () => {
    render(<Converter />);
    const amountInput = screen.getByLabelText("Amount");
    const fromCurrencySelect = screen.getByLabelText("select-change");
    const toCurrencySelect = screen.getByLabelText("select-get");

    fireEvent.change(amountInput, { target: { value: "10" } });
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.change(fromCurrencySelect.querySelector("input"), {
      target: { value: "USD" },
    });
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.change(toCurrencySelect.querySelector("input"), {
      target: { value: "EUR" },
    });

    expect(screen.getByLabelText("Result")).toHaveValue("12.5");
  });

  it("swaps currencies when swap button is clicked", () => {
    render(<Converter />);

    const swapButton = screen.getByLabelText("swap-currencies");
    const fromCurrencySelect = screen.getByLabelText("select-change");
    const toCurrencySelect = screen.getByLabelText("select-get");

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.change(fromCurrencySelect.querySelector("input"), {
      target: { value: "USD" },
    });
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.change(toCurrencySelect.querySelector("input"), {
      target: { value: "EUR" },
    });

    // Click the swap button
    fireEvent.click(swapButton);

    // eslint-disable-next-line testing-library/no-node-access
    expect(fromCurrencySelect.querySelector("input")).toHaveAttribute(
      "value",
      "EUR"
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(toCurrencySelect.querySelector("input")).toHaveAttribute(
      "value",
      "USD"
    );
  });
});
