//Will  provide the interactivity for the app

import "./Button.css";

const Button = ({ className, value, onClick }) => {
	return (
		<button className={className} onClick={onClick}>
			{value}
		</button>
	);
};

export default Button;
