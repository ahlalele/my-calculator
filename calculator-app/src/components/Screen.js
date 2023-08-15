//The purpose the screen is to display calculated values

import { Textfit } from "react-textfit";
import "./Screen.css";

const Screen = ({ value }) => {
	return (
		<Textfit className="screen" mode="single" max={70}>
			{value}
		</Textfit>
	);
};

export default Screen;
