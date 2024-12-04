import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BoxList from "./BoxList";

it("renders without crashing", () => {
	render(<BoxList />);
});

it("matches snapshot", () => {
	const { asFragment } = render(<BoxList />);
	expect(asFragment()).toMatchSnapshot();
});

it("adds box when form is submitted", () => {
	const { getByLabelText, getByText, queryByText } = render(<BoxList />);

	// Simulate filling in the form
	const inputWidth = getByLabelText("Box width:");
	const inputHeight = getByLabelText("Box height:");
	const inputColor = getByLabelText("Box color:");
	const button = getByText("Create Box!");

	fireEvent.change(inputWidth, { target: { value: 100 } });
	fireEvent.change(inputHeight, { target: { value: 100 } });
	fireEvent.change(inputColor, { target: { value: "#ff0000" } });
	fireEvent.click(button);

	// Check if the box is rendered
	expect(getByText("X")).toBeInTheDocument();
});

it("removes a box when button is clicked", () => {
	const { getByLabelText, getByText, queryByText } = render(<BoxList />);

	// Simulate filling in the form
	const inputWidth = getByLabelText("Box width:");
	const inputHeight = getByLabelText("Box height:");
	const inputColor = getByLabelText("Box color:");
	const button = getByText("Create Box!");

	fireEvent.change(inputWidth, { target: { value: 100 } });
	fireEvent.change(inputHeight, { target: { value: 100 } });
	fireEvent.change(inputColor, { target: { value: "#ff0000" } });
	fireEvent.click(button);

	const removeButton = getByText("X");
	fireEvent.click(removeButton);

	// Check if the box is rendered
	expect(queryByText("X")).toBeNull();
});
