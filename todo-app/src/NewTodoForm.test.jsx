import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewTodoForm from "./NewTodoForm";

it("renders without crashing", () => {
	render(<NewTodoForm addTodo={() => {}} />);
});

it("matches snapshot", () => {
	const { asFragment } = render(<NewTodoForm addTodo={() => {}} />);
	expect(asFragment()).toMatchSnapshot();
});

it("updates state when input values change", () => {
	const { getByPlaceholderText } = render(<NewTodoForm addTodo={() => {}} />);

	fireEvent.change(getByPlaceholderText("Enter a new todo"), { target: { value: "New todo" } });
	expect(getByPlaceholderText("Enter a new todo").value).toBe("New todo");
});

it("updates state to default values upon submission", () => {
	const mockAddTodo = vi.fn();
	const { getByPlaceholderText, getByText } = render(<NewTodoForm addTodo={mockAddTodo} />);

	fireEvent.change(getByPlaceholderText("Enter a new todo"), { target: { value: "New todo" } });
	fireEvent.click(getByText("Add Todo!"));
	expect(getByPlaceholderText("Enter a new todo").value).toBe("");
});

it("calls addTodo with the correct form data on submit", () => {
	const mockAddTodo = vi.fn();
	const { getByPlaceholderText, getByText } = render(<NewTodoForm addTodo={mockAddTodo} />);

	fireEvent.change(getByPlaceholderText("Enter a new todo"), { target: { value: "New todo" } });
	fireEvent.click(getByText("Add Todo!"));

	expect(mockAddTodo).toHaveBeenCalledWith("New todo");
});
