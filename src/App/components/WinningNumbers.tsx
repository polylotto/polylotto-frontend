import React from "react";
import "../css/winningNumber.css";

interface numbersColorsI {
	digit: string;
	color: string;
}

interface props {
	winningNumber: number | string;
	category: string;
	colorScheme?: string[];
}

export const numbersColors = (
	winningNumber: string | number,
	colorScheme: string[]
): numbersColorsI[] => {
	const numToString = `${winningNumber}`;
	let numColorArray: numbersColorsI[] = [];
	for (let index = 0; index < numToString.length; index++) {
		numColorArray.push({
			digit: numToString[index],
			color: colorScheme[index],
		});
	}
	return numColorArray;
};

export const WinningNumbers: React.FC<props> = ({
	winningNumber,
	category,
	colorScheme,
}) => {
	let colors = colorScheme as string[];
	if (!colorScheme) {
		colors = ["#f94144", "#f3722c", "#f8961e", "#f9c74f", "#90be6d", "#43aa8b"];
	}
	const digitsWithColors = numbersColors(winningNumber, colors);
	return (
		<div className="winning-number">
			<p className="category">{category}</p>
			<div>
				{digitsWithColors.map(({ digit, color }, key) => {
					return (
						<p key={key} className="digit" style={{ background: color }}>
							{digit}
						</p>
					);
				})}
			</div>
		</div>
	);
};
