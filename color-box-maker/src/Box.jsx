import "./Box.css";

const Box = ({ bgColor, width, height, removeBox }) => {
	return (
		<div className="Box">
			<div
				style={{
					width: `${width}px`,
					height: `${height}px`,
					backgroundColor: `${bgColor}`,
					margin: "10px",
					border: "1px solid grey",
				}}
			></div>
			<button type="button" className="Box-remove" onClick={removeBox}>
				X
			</button>
		</div>
	);
};

export default Box;
