import React from "react";
import "../css/prizepot.css";
import { RoundTickets } from "./RoundTickets";
import WinningCategory from "./WinningCategory";
import { useRaffleContext } from "../../context/raffle";
import { formatBigNumber, convertTime } from "../../utils/utils";

interface props {
	raffleCategory: number;
}
const PrizePot: React.FC<props> = ({ raffleCategory }) => {
	const [active, setActive] = React.useState(false);
	const [ticketModal, setTicketModal] = React.useState(false);
	const handleActive = () => {
		active ? setActive(false) : setActive(true);
	};
	const handleTicketModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		ticketModal ? setTicketModal(false) : setTicketModal(true);
	};
	const { state } = useRaffleContext();
	//@ts-ignore
	const categoryData = state.raffleCategoryData === []
			? 0
			: state.raffleCategoryData[raffleCategory];
	const prizepot = categoryData ? categoryData.rafflePool : 0;
	const tickets = categoryData ? categoryData.userTicketsPerRaffle : [];
	const raffleId = state.raffleID;
	const estimatedWinningCategoryPayouts = categoryData
		? categoryData.currentRaffleData.winnersPayout
		: [];
	const winners : string[] = [];
	return (
		<div className="">
			<div className="prizepot">
				<div className="prizepot-header">
					<h3>Next Draw: {convertTime(Number(state.currentRaffleEndTime))}</h3>
				</div>

				<div className="prizepot-profit">
					<h2>Prize Pot</h2>
					<div>
						<small>{formatBigNumber(prizepot)} USDC</small>
					</div>
				</div>

				<div className="your-tickets">
					<h2>Your Tickets</h2>
					<div>
						<p>You have {tickets.length} ticket(s) this round</p>
						<a
							href=" /#"
							style={{ color: "var(--main-color)" }}
							onClick={handleTicketModal}
						>
							View your tickets
						</a>
					</div>
				</div>

				{ticketModal && (
					<RoundTickets
						setTicketModal={setTicketModal}
						tickets={tickets}
						raffleID={raffleId}
					/>
				)}

				<div className="prizes">
					<div className={active ? "prizes-active" : "prizes-hidden"}>
						<WinningCategory
							estimatedPayouts={estimatedWinningCategoryPayouts}
							prevRounds={false}
							winnersAddress = {winners}
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

export default PrizePot;
