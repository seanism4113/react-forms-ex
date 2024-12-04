import { useState } from "react";
import NewBoxForm from "./NewBoxForm";
import Box from "./Box";
import "./BoxList.css";

const BoxList = () => {
	const [boxes, setBoxes] = useState([]);

	const addBox = (newBox) => {
		setBoxes((currBoxes) => [...currBoxes, newBox]);
	};

	const removeBox = (idxRemove) => {
		setBoxes((currBoxes) => currBoxes.filter((_, idx) => idx !== idxRemove));
	};

	const showBoxes = () => boxes.map((box, idx) => <Box key={idx} width={box.boxWidth} height={box.boxHeight} bgColor={box.bgColor} removeBox={() => removeBox(idx)} />);

	return (
		<>
			<NewBoxForm addBox={addBox} />
			<div className="BoxList-boxes">{showBoxes()}</div>
		</>
	);
};

export default BoxList;
