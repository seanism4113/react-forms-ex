import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Box from "./Box";

it("renders without crashing", () => {
	render(<Box />);
});

it("matches snapshot", () => {
	const { asFragment } = render(<Box />);
	expect(asFragment()).toMatchSnapshot();
});

it("calls removeBox function when button is clicked", () => {
	const mockRemoveBox = vi.fn();
	const { getByText } = render(<Box width={100} height={100} bgColor="#ff0000" removeBox={mockRemoveBox} />);
	const removeButton = getByText("X");
	fireEvent.click(removeButton);
	expect(mockRemoveBox).toHaveBeenCalled();
});
