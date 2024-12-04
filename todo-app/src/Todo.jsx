import { useState } from "react";
import "./Todo.css";

const Todo = ({ id, task, removeTodo, updateTodo }) => {
	const [editTask, setEditTask] = useState(task);
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => {
		setIsEditing((edit) => !edit);
	};

	const handleChange = (evt) => {
		setEditTask(evt.target.value);
	};

	const handleRemove = () => removeTodo(id);

	const handleUpdate = (evt) => {
		evt.preventDefault();
		updateTodo(id, editTask);
		setIsEditing(false);
	};

	// default todo view
	let jsx = (
		<div className="Todo-div">
			<li className="Todo-task">{task}</li>
			<div>
				<button className="Todo-btn" onClick={toggleEdit}>
					Edit
				</button>
				<button id="remove-btn" className="Todo-btn" onClick={handleRemove}>
					Remove
				</button>
			</div>
		</div>
	);

	// todo view when editing
	if (isEditing) {
		jsx = (
			<div className="Todo-div">
				<form className="Todo-updateForm" onSubmit={handleUpdate}>
					<input className="Todo-input" type="text" value={editTask} onChange={handleChange} />
					<button id="update-btn" className="Todo-btn">
						Update
					</button>
				</form>
			</div>
		);
	}

	return jsx;
};

export default Todo;
