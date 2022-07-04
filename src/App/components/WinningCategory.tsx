import React from "react";
import { formatBigNumber } from "../../utils/utils";

interface props {
	estimatedPayouts: string[];
	prevRounds: Boolean;
	winnersAddress: string[];
}

// Imported In Ticket Section
const WinningCategory: React.FC<props> = ({ estimatedPayouts, prevRounds, winnersAddress }) => {
	const deadAddress = "0x000000000000000000000000000000000000dEaD";
	const defaults : string[] = ["1", "2", "3"];
	defaults[0] = winnersAddress[0]? winnersAddress[0] : deadAddress;
	defaults[1] = winnersAddress[0]? winnersAddress[0] : deadAddress;
	defaults[2] = winnersAddress[0]? winnersAddress[0] : deadAddress;
	return (
		<div>
			<div className="winning-category">
				<div className="winner1">
					<p className="winner-head">First Lucky Winner</p>
					<p className="winner-amount">
						{estimatedPayouts[0] ? formatBigNumber(estimatedPayouts[0]) : 0}{" "}
						USDC
					</p>
					{/* <small>~$4000</small> */}
					{prevRounds && (
						<p style={{ opacity: 0.6 }}>
							Winner's Address:
							<a href={`https://mumbai.polygonscan.com/address/${defaults[0]}`} target="_blank" rel="noopener noreferrer" className="address">
								{defaults[0].slice(0,10)}...
							</a>
						</p>
					)}
				</div>
				<div className="winner2">
					<p className="winner-head">Second Lucky Winner</p>
					<p className="winner-amount">
						{estimatedPayouts[1] ? formatBigNumber(estimatedPayouts[1]) : 0}{" "}
						USDC
					</p>
					{/* <small>~$7211</small> */}
					{prevRounds && (
						<p style={{ opacity: 0.6 }}>
							Winner's Address:
							<a href={`https://mumbai.polygonscan.com/address/${defaults[1]}`} target="_blank" rel="noopener noreferrer" className="address">
							{defaults[1].slice(0,10)}...
							</a>
						</p>
					)}
				</div>
				<div className="winner3">
					<p className="winner-head">Third Lucky Winner</p>
					<p className="winner-amount">
						{" "}
						{estimatedPayouts[2]
							? formatBigNumber(estimatedPayouts[2])
							: 0}{" "}
						USDC
					</p>
					{/* <small>~$12000</small> */}
					{prevRounds && (
						<p style={{ opacity: 0.6 }}>
							Winner's Address:
							<a href={`https://mumbai.polygonscan.com/address/${defaults[2]}`} target="_blank" rel="noopener noreferrer" className="address">
							{defaults[2].slice(0,10)}...							</a>
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default WinningCategory;
