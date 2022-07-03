import React from "react";
import "../css/prizepot.css";
import "../css/finishedRounds.css";
import WinningCategory from "./WinningCategory";
import { useRaffleContext } from "../../context/raffle";
import { convertTime } from "../../utils/utils";
import { WinningNumbers } from "./WinningNumbers";

interface props {
	raffleCategory: number;
}
const PrevRounds: React.FC<props> = ({ raffleCategory }) => {
	const [active, setActive] = React.useState(false);
	const handleActive = () => {
		active ? setActive(false) : setActive(true);
	};

	const { state } = useRaffleContext();
	//@ts-ignore
	const categoryData =
		state.raffleCategoryData === []
			? 0
			: state.raffleCategoryData[raffleCategory];
	const estimatedWinningCategoryPayouts = categoryData
		? categoryData.currentRaffle.winnersPayout
		: [];
	return (
		<div className="">
			<div className="prizepot">
				<div className="finished-rounds_header">
					<div className="rounds">
						<h3>
							Round <span className="round-num">581</span>
						</h3>
						<div className="rounds-nav">
							<span className="prev">&#8592;</span>
							<span className="next">&#8594;</span>
						</div>
					</div>
					<div>
						<p>Drawn {convertTime(Number(state.currentRaffleEndTime))}</p>
					</div>
				</div>
				<hr style={{ opacity: 0.2, margin: 0 }} />
				<div className="winning-numbers">
					<div className="winning-numbers_status">in progress</div>
					<div>
						<WinningNumbers
							winningNumber={597423}
							category={"Winning Number 1"}
						/>
					</div>
					<div>
						<WinningNumbers
							winningNumber={849751}
							category={"Winning Number 2"}
							colorScheme={[
								"#588157",
								"#fe7f2d",
								"#fcca46",
								"#a1c181",
								"#619b8a",
								"#585123",
							]}
						/>
					</div>
					<div>
						<WinningNumbers
							winningNumber={268745}
							category={"Winning Number 3"}
							colorScheme={[
								"#fb6107",
								"#f3de2c",
								"#7cb518",
								"#5c8001",
								"#fbb02d",
								"#3d348b",
							]}
						/>
					</div>
				</div>
				<div className="prizes">
					<div className={active ? "prizes-active" : "prizes-hidden"}>
						<WinningCategory
							estimatedPayouts={estimatedWinningCategoryPayouts}
							prevRounds={true}
						/>
					</div>
				</div>
				<div className="details-btn" onClick={handleActive}>
					{!active ? (
						<>
							<span>Details</span> <span>&#9660;</span>
						</>
					) : (
						<>
							<span>Hide</span> <span>&#9650;</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PrevRounds;
