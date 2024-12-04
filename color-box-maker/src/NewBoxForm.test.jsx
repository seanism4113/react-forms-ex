import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewBoxForm from "./NewBoxForm";

it("renders without crashing", () => {
	render(<NewBoxForm />);
});

it("matches snapshot", () => {
	const { asFragment } = render(<NewBoxForm />);
	expect(asFragment()).toMatchSnapshot();
});

it("updates state when input values change", () => {
	const { getByLabelText } = render(<NewBoxForm />);

	fireEvent.change(getByLabelText("Box width:"), { target: { value: "200" } });
	fireEvent.change(getByLabelText("Box height:"), { target: { value: "150" } });
	fireEvent.change(getByLabelText("Box color:"), { target: { value: "#ff0000" } });

	expect(getByLabelText("Box width:").value).toBe("200");
	expect(getByLabelText("Box height:").value).toBe("150");
	expect(getByLabelText("Box color:").value).toBe("#ff0000");
});

it("updates state to default values upon submission", () => {
	const mockAddBox = vi.fn();
	const { getByLabelText, getByText } = render(<NewBoxForm addBox={mockAddBox} />);

	fireEvent.change(getByLabelText("Box width:"), { target: { value: "200" } });
	fireEvent.change(getByLabelText("Box height:"), { target: { value: "150" } });
	fireEvent.change(getByLabelText("Box color:"), { target: { value: "#ff0000" } });

	fireEvent.click(getByText("Create Box!"));

	expect(getByLabelText("Box width:").value).toBe("50");
	expect(getByLabelText("Box height:").value).toBe("50");
	expect(getByLabelText("Box color:").value).toBe("#00b200");
});

it("calls addBox with the correct form data on submit", () => {
	const mockAddBox = vi.fn();
	const { getByLabelText, getByText } = render(<NewBoxForm addBox={mockAddBox} />);

	fireEvent.change(getByLabelText("Box width:"), { target: { value: "150" } });
	fireEvent.change(getByLabelText("Box height:"), { target: { value: "150" } });
	fireEvent.change(getByLabelText("Box color:"), { target: { value: "#ff0000" } });

	fireEvent.click(getByText("Create Box!"));

	expect(mockAddBox).toHaveBeenCalledWith({
		boxWidth: "150",
		boxHeight: "150",
		bgColor: "#ff0000",
	});
});
