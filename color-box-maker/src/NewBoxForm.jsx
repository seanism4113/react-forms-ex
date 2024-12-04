import { useState } from "react";
import "./NewBoxForm.css";

const NewBoxForm = ({ addBox }) => {
	const INITIAL_STATE = {
		boxWidth: 50,
		boxHeight: 50,
		bgColor: "#00b200",
	};
	const [formData, setFormData] = useState(INITIAL_STATE);

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		addBox({ ...formData });
		setFormData(INITIAL_STATE);
	};

	return (
		<>
			<h1>Create a Box!</h1>
			<form className="NewBoxForm" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="boxWidth">Box width: </label>
					<input id="boxWidth" type="range" min={50} max={300} step={50} name="boxWidth" value={formData.boxWidth} onChange={handleChange} />
					<span>
						<b>{formData.boxWidth} pixels</b>
					</span>
				</div>
				<div>
					<label htmlFor="boxHeight">Box height: </label>
					<input id="boxHeight" type="range" min={50} max={300} step={50} name="boxHeight" value={formData.boxHeight} onChange={handleChange} />
					<span>
						<b>{formData.boxHeight} pixels</b>
					</span>
				</div>

				<div>
					<label htmlFor="bgColor">Box color: </label>
					<input id="bgColor" type="color" name="bgColor" value={formData.bgColor} onChange={handleChange} />
				</div>

				<button type="submit">Create Box!</button>
			</form>
		</>
	);
};

export default NewBoxForm;
