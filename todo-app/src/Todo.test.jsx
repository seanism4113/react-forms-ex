import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import Todo from "./Todo";

it("renders without crashing", () => {
	render(<Todo id="1" task="Test todo" removeTodo={() => {}} updateTodo={() => {}} />);
});

it("matches snapshot", () => {
	const { asFragment } = render(<Todo id="1" task="Test todo" removeTodo={() => {}} updateTodo={() => {}} />);
	expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot in edit screen", () => {
	const { asFragment, getByText } = render(<Todo id="1" task="Test todo" removeTodo={() => {}} updateTodo={() => {}} />);
	const editButton = getByText("Edit");
	fireEvent.click(editButton);
	expect(asFragment()).toMatchSnapshot();
});

it("calls removeTodo function when button is clicked", () => {
	const mockRemoveTodo = vi.fn();
	const { getByText } = render(<Todo id="1" task="Test todo" removeTodo={mockRemoveTodo} />);
	const removeButton = getByText("Remove");
	fireEvent.click(removeButton);
	expect(mockRemoveTodo).toHaveBeenCalled();
});

it("calls updateTodo function with task updated", () => {
	const mockUpdateTodo = vi.fn();
	const { getByText, getByDisplayValue } = render(<Todo id="1" task="Test todo" updateTodo={mockUpdateTodo} />);
	const editButton = getByText("Edit");
	fireEvent.click(editButton);
	const input = getByDisplayValue("Test todo");
	fireEvent.change(input, { target: { value: "Updated todo" } });
	const updateButton = getByText("Update");
	fireEvent.click(updateButton);
	expect(mockUpdateTodo).toHaveBeenCalledWith("1", "Updated todo");
});

it("renders the text correctly", () => {
	const { getByText } = render(<Todo id="1" task="Test todo" removeTodo={() => {}} updateTodo={() => {}} />);
	expect(getByText("Test todo")).toBeInTheDocument();
});
