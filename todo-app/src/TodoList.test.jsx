import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "./TodoList";

it("renders without crashing", () => {
	render(<TodoList />);
});

it("matches snapshot", () => {
	const { asFragment } = render(<TodoList />);
	expect(asFragment()).toMatchSnapshot();
});

it("adds todo when form is submitted", () => {
	const { getByPlaceholderText, getByText } = render(<TodoList />);

	// Simulate filling in the form
	const task = getByPlaceholderText("Enter a new todo");
	const button = getByText("Add Todo!");

	fireEvent.change(task, { target: { value: "test todo" } });
	fireEvent.click(button);
	expect(getByText("Remove")).toBeInTheDocument();
});

it("removes a box when button is clicked", () => {
	const { getByPlaceholderText, getByText, queryByText } = render(<TodoList />);

	// Simulate filling in the form
	const task = getByPlaceholderText("Enter a new todo");
	const button = getByText("Add Todo!");

	fireEvent.change(task, { target: { value: "test todo" } });
	fireEvent.click(button);

	const removeButton = getByText("Remove");
	fireEvent.click(removeButton);

	// Check if the box is rendered
	expect(queryByText("Remove")).toBeNull();
});

it("updates a todo when the edit form is submitted", () => {
	const { getByPlaceholderText, getByText, getByDisplayValue } = render(<TodoList />);

	const taskInput = getByPlaceholderText("Enter a new todo");
	fireEvent.change(taskInput, { target: { value: "original todo" } });
	fireEvent.click(getByText("Add Todo!"));

	// Click edit and update the todo
	fireEvent.click(getByText("Edit"));
	const editInput = getByDisplayValue("original todo");
	fireEvent.change(editInput, { target: { value: "updated todo" } });
	fireEvent.click(getByText("Update"));

	// Check if the updated todo appears
	expect(getByText("updated todo")).toBeInTheDocument();
});

it("adds multiple todos to the list", () => {
	const { getByPlaceholderText, getByText } = render(<TodoList />);

	const taskInput = getByPlaceholderText("Enter a new todo");

	fireEvent.change(taskInput, { target: { value: "todo 1" } });
	fireEvent.click(getByText("Add Todo!"));
	fireEvent.change(taskInput, { target: { value: "todo 2" } });
	fireEvent.click(getByText("Add Todo!"));

	expect(getByText("todo 1")).toBeInTheDocument();
	expect(getByText("todo 2")).toBeInTheDocument();
});
