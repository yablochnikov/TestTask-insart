import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CustomTableCell from "./CustomTableCell";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn((effect) => {
    effect();
  }),
}));

describe("CustomTableCell", () => {
  it("renders without crashing", () => {
    render(
      <table>
        <tbody>
          <tr>
            <CustomTableCell value={42} mode="buy" currency="USD" />
          </tr>
        </tbody>
      </table>
    );
  });

  it("enters edit mode on edit button click", () => {
    render(
      <table>
        <tbody>
          <tr>
            <CustomTableCell value={42} mode="buy" currency="USD" />
          </tr>
        </tbody>
      </table>
    );
    fireEvent.mouseEnter(screen.getByLabelText("table-cell"));
    fireEvent.click(screen.getByLabelText("edit-button"));
    expect(screen.getByLabelText("text-field")).toBeEnabled();
  });

  it("disables save button if input is invalid", async () => {
    render(
      <table>
        <tbody>
          <tr>
            <CustomTableCell value={42} mode="buy" currency="USD" />
          </tr>
        </tbody>
      </table>
    );

    fireEvent.mouseEnter(screen.getByRole("cell"));

    fireEvent.click(screen.getByLabelText("edit-button"));

    //otherwise the test will fail because of mui library document structure
    // eslint-disable-next-line testing-library/no-node-access
    const input = screen.getByLabelText("text-field").querySelector("input");

    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
      target: { value: "4" },
    });
    fireEvent.click(screen.getByLabelText("save-button"));
    expect(screen.getByLabelText("save-button")).toBeDisabled();
  });

  it("enables save button if input is valid", () => {
    render(
      <table>
        <tbody>
          <tr>
            <CustomTableCell value={42} mode="buy" currency="USD" />
          </tr>
        </tbody>
      </table>
    );
    fireEvent.mouseEnter(screen.getByRole("cell"));

    fireEvent.click(screen.getByLabelText("edit-button"));

    //otherwise the test will fail because of mui library document structure
    // eslint-disable-next-line testing-library/no-node-access
    const input = screen.getByLabelText("text-field").querySelector("input");

    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
      target: { value: "43" },
    });
    fireEvent.click(screen.getByLabelText("save-button"));
    expect(screen.queryByLabelText("save-button")).not.toBeInTheDocument();
  });

  it("cancels edit mode on cancel button click", () => {
    render(
      <table>
        <tbody>
          <tr>
            <CustomTableCell value={42} mode="buy" currency="USD" />
          </tr>
        </tbody>
      </table>
    );
    fireEvent.mouseEnter(screen.getByRole("cell"));

    fireEvent.click(screen.getByLabelText("edit-button"));

    //otherwise the test will fail because of mui library document structure
    // eslint-disable-next-line testing-library/no-node-access
    const input = screen.getByLabelText("text-field").querySelector("input");

    expect(input).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("cancel-button"));
    expect(screen.queryByLabelText("save-button")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("cancel-button")).not.toBeInTheDocument();
  });
});
