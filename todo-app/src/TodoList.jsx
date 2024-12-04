import { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import { v4 as uuid } from "uuid";
import "./TodoList.css";

const TodoList = () => {
	const [todos, setTodos] = useState([]);

	const addTodo = (newTask) => {
		const newTodo = { id: uuid(), task: newTask };
		setTodos((prevTodos) => [...prevTodos, newTodo]);
	};

	const removeTodo = (id) => {
		setTodos((currTodos) => currTodos.filter((todo) => todo.id !== id));
	};

	const updateTodo = (id, updatedTask) => {
		setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, task: updatedTask } : todo)));
	};

	const showTodos = () => {
		return todos.map((todo) => <Todo key={todo.id} id={todo.id} task={todo.task} removeTodo={removeTodo} updateTodo={updateTodo} />);
	};

	return (
		<>
			<NewTodoForm addTodo={addTodo} />
			<h1 className="TodoList-header">Todo List</h1>
			<div className="TodoList">
				<ul className="TodoList-ul">{showTodos()}</ul>
			</div>
		</>
	);
};

export default TodoList;
