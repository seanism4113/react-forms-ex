import { useState } from "react";
import "./NewTodoForm.css";

const NewTodoForm = ({ addTodo }) => {
	const [formData, setFormData] = useState("");

	const handleChange = (evt) => {
		setFormData(evt.target.value);
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		addTodo(formData);
		setFormData("");
	};

	return (
		<form className="NewTodoForm" onSubmit={handleSubmit}>
			<div className="NewTodoForm-content">
				<label htmlFor="todo"></label>
				<input className="NewTodoForm-input" type="text" id="todo" name="todo" placeholder="Enter a new todo" value={formData} onChange={handleChange} />
			</div>

			<button type="submit" className="NewTodoForm-btn">
				Add Todo!
			</button>
		</form>
	);
};

export default NewTodoForm;
