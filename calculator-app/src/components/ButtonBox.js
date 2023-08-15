//Will be the frame for the children but only for the button components

import "./ButtonBox.css";

const ButtonBox = ({ children }) => {
	return <div className="buttonBox">{children}</div>;
};

export default ButtonBox;
