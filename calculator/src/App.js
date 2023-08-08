import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import React, { useState } from "react";

const btnValues = [
	["C", "+-", "%", "/"],
	[7, 8, 9, "X"],
	[4, 5, 6, "-"],
	[1, 2, 3, "+"],
	[0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
  
const removeSpaces = (num) => num.toString().replace(/\s/g, "");


const App = () => {
	let [calculation, setCalculation] = useState({
		operator: "",
		num: 0,
		answer: 0,
	});

	const numClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;

		if (removeSpaces(calculation.num).length < 16) {
			setCalculation({
				...calculation,
				num:
					calculation.num === 0 && value === "0"
						? "0"
						: removeSpaces(calculation.num) % 1 === 0
						? toLocaleString(Number(removeSpaces(calculation.num + value)))
						: toLocaleString(calculation.num + value),
				answer: !calculation.operator ? 0 : calculation.answer,
			});
		}
	};

	const commaClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;

		setCalculation({
			...calculation,
			num: !calculation.num.toString().includes(".")
				? calculation.num + value
				: calculation.num,
		});
	};

	const signClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;

		setCalculation({
			...calculation,
			operator: value,
			answer:
				!calculation.answer && calculation.num
					? calculation.num
					: calculation.answer,
			num: 0,
		});
	};

	const equalsClickHandler = (e) => {
		if (calculation.operator && calculation.num) {
			const math = (a, b, operator) =>
				operator === "+"
					? a + b
					: operator === "-"
					? a - b
					: operator === "X"
					? a * b
          : a / b;
      
      setCalculation({
        ...calculation,
        answer:
          calculation.num === "0" && calculation.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(math(Number(removeSpaces(calculation.answer)), Number(removeSpaces(calculation.num)), calculation.operator)),
        operator: "",
        num: 0,
      });
      
		}
  };
  
  const invertClickHandler = () => {
    setCalculation({
		...calculation,
		num: calculation.num ? toLocaleString(removeSpaces(calculation.num) * -1) : 0,
		answer: calculation.answer ? toLocaleString(removeSpaces(calculation.answer) * -1) : 0,
		sign: "",
	});
  };

  const percentClickHandler = () => {
    let num = calculation.num ? parseFloat(removeSpaces(calculation.num)) : 0;
    let answer = calculation.answer ? parseFloat(removeSpaces(calculation.answer)) : 0;

    setCalculation({
      ...calculation,
      num: (num /= Math.pow(100, 1)),
      answer: (answer /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalculation({
      ...calculation,
      operator: "",
      num: 0,
      answer: 0,
    });
  };

	return (
		<Wrapper>
			<Screen
				value={calculation.num ? calculation.num : calculation.answer}
			/>
			<ButtonBox>
				{btnValues.flat().map((btn, i) => {
					return (
						<Button
							key={i}
							className={btn === "=" ? "equals" : ""}
							value={btn}
							onClick={
								btn === "C"
									? resetClickHandler
									: btn === "+-"
									? invertClickHandler
									: btn === "%"
									? percentClickHandler
									: btn === "="
									? equalsClickHandler
									: btn === "/" ||
									  btn === "X" ||
									  btn === "-" ||
									  btn === "+"
									? signClickHandler
									: btn === "."
									? commaClickHandler
									: numClickHandler
							}
						/>
					);
				})}
			</ButtonBox>
		</Wrapper>
	);
}

export default App;
