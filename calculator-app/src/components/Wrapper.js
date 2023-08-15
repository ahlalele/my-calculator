//The frame that holds all the children components in place

import "./Wrapper.css";

const Wrapper = ({ children }) => {
	return <div className="wrapper">{children}</div>;
};

export default Wrapper;
