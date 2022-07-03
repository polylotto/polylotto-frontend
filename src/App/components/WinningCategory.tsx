import React from "react";
import { formatBigNumber } from "../../utils/utils";

interface props {
	estimatedPayouts: string[];
	prevRounds: Boolean;
}

// Imported In Ticket Section
const WinningCategory: React.FC<props> = ({ estimatedPayouts, prevRounds }) => {
	const address = "0xc1Ca8E5246eB4aa2D39405532B12C823B22b03F8";
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
							<a href="#" className="address">
								{address.slice(0, 10)}...
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
							<a href="#" className="address">
								{address.slice(0, 10)}...
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
							<a href="#" className="address">
								{address.slice(0, 10)}...
							</a>
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default WinningCategory;
