import React, { useState } from "react";
import "../css/prizepot.css";
import "../css/finishedRounds.css";
import WinningCategory from "./WinningCategory";
import { useRaffleContext } from "../../context/raffle";
import { convertTime } from "../../utils/utils";
import { getRaffle } from "../../api/raffle";
import { WinningNumbers } from "./WinningNumbers";

interface RaffleData {
    raffleID: number;
    noOfTicketSold: number;
    noOfPlayers: string;
    winners: string[];
    winningTickets: string[];
    winnersPayout: string[];
    raffleStartTime: string;
    raffleEndTime: string;
    amountInjected: string;
}
  
interface CategoryData {
    raffleCategory: number;
    rafflePool: string;
    currentRaffleState: string;
    currentRaffle: RaffleData;
    mostRecentRaffles: RaffleData[];
    userTicketsPerRaffle: string[];
  }

interface props {
	raffleCategory: number;
}
const PrevRounds: React.FC<props> = ({ raffleCategory }) => {
	const INITIAL_STATE: RaffleData = {
        raffleID: 0,
        noOfTicketSold: 0,
        noOfPlayers: "",
        winners: ["0x","0x","0x"],
        winningTickets: ["000000","000000","000000"],
        winnersPayout: [],
        raffleStartTime: "",
        raffleEndTime: "",
        amountInjected: ""
    }
	const [active, setActive] = React.useState(false);
	const handleActive = () => {
		active ? setActive(false) : setActive(true);
	};

	const { state } = useRaffleContext();
	//@ts-ignore
	const categoryData = state.raffleCategoryData === []
			? 0
			: state.raffleCategoryData[raffleCategory];
	const raffle : RaffleData = categoryData ? categoryData.prevRaffleData : INITIAL_STATE;
	const [raffleID, setRaffleID] = useState(raffle.raffleID);
	const [raffleRequestData, setRaffle] = useState({});

	const nextRaffle = async (e: React.MouseEvent<HTMLAnchorElement>)=>{
        e.preventDefault();
        setRaffleID(raffleID + 1);
        const raffle = await getRaffle({raffleCategory, raffleID});
        setRaffle(raffle);
    }
	const prevRaffle = async (e: React.MouseEvent<HTMLAnchorElement>)=>{
        e.preventDefault();
        setRaffleID(raffleID - 1);
        const raffle = await getRaffle({raffleCategory, raffleID});
        setRaffle(raffle);
    }

	return (
		<div className="">
			<div className="prizepot">
				<div className="finished-rounds_header">
					<div className="rounds">
						<h3>
							Round <span className="round-num">{raffleID}</span>
						</h3>
						<div className="rounds-nav">
							<a href="/#" onClick={prevRaffle} className="prev">&#8592;</a>
							<a href="/#" onClick={nextRaffle} className="next">&#8594;</a>
						</div>
					</div>
					<div>
						<p>Drawn {convertTime(Number(state.currentRaffleEndTime))}</p>
					</div>
				</div>
				<hr style={{ opacity: 0.2, margin: 0 }} />
				<div className="winning-numbers">
					<div className="winning-numbers_status">Latest</div>
					<div>
						<WinningNumbers
							winningNumber={raffle.winningTickets[0]}
							category={"Winning Number 1"}
						/>
					</div>
					<div>
						<WinningNumbers
							winningNumber={raffle.winningTickets[1]}
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
							winningNumber={raffle.winningTickets[2]}
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
							estimatedPayouts={raffle.winnersPayout}
							prevRounds={true}
							winnersAddress={raffle.winners}
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
