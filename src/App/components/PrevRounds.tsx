import React, { useState } from "react";
import "../css/prizepot.css";
import "../css/finishedRounds.css";
import WinningCategory from "./WinningCategory";
import { useRaffleContext } from "../../context/raffle";
import { convertTime } from "../../utils/utils";
import { getRaffle } from "../../api/raffle";
import { WinningNumbers } from "./WinningNumbers";


type RaffleData = {
    ID: number;
    noOfTicketsSold: number;
    noOfPlayers: string;
    winners: string[];
    winningTickets: string[];
    winnersPayout: string[];
    raffleStartTime: string;
    raffleEndTime: string;
    amountInjected: string;
}

interface props {
	raffleCategory: number;
}
const PrevRounds: React.FC<props> = ({ raffleCategory }) => {
	const INITIAL_STATE: RaffleData = {
        ID: 0,
        noOfTicketsSold: 0,
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
	const [status, setStatus] = useState(true);

	const { state } = useRaffleContext();
	//@ts-ignore
	const categoryData = state.raffleCategoryData === []
			? 0
			: state.raffleCategoryData[raffleCategory];
	const _raffle : RaffleData = categoryData ? categoryData.prevRaffleData : INITIAL_STATE;
	const [raffleId, setRaffleID] = useState(_raffle.ID);
	const [raffle, setRaffle] = useState(_raffle);

	const nextRaffle = async (e: React.MouseEvent<HTMLAnchorElement>)=>{
        e.preventDefault();
		const raffleID = raffleId + 1;
		if(raffleID == _raffle.ID){
			setStatus(true);
		}
		if(raffleID > _raffle.ID){
			return;
		}
        const raffle = await getRaffle({raffleCategory, raffleID});
		setRaffleID(raffleID);
        setRaffle(raffle);
    }
	const prevRaffle = async (e: React.MouseEvent<HTMLAnchorElement>)=>{
        e.preventDefault();
        const raffleID = raffleId - 1;
		if(raffleID < 1){
			return
		}
        const raffle = await getRaffle({raffleCategory, raffleID});
		setRaffleID(raffleID);
		setRaffle(raffle);
		setStatus(false);
    }

	return (
		<div className="">
			<div className="prizepot">
				<div className="finished-rounds_header">
					<div className="rounds">
						<h3>
							Round <span className="round-num">{raffleId}</span>
						</h3>
						<div className="rounds-nav">
							<a href="/#" onClick={prevRaffle} className="prev">&#8592;</a>
							<a href="/#" onClick={nextRaffle} className="next">&#8594;</a>
						</div>
					</div>
					<div>
						<p>Drawn {convertTime(Number(raffle.raffleEndTime))}</p>
					</div>
				</div>
				<hr style={{ opacity: 0.2, margin: 0 }} />
				<div className="winning-numbers">
					{status? <div className="winning-numbers_status">Latest&#160;</div> : <></>}
					<div>
						<WinningNumbers
							winningNumber={raffle.winningTickets[0]? raffle.winningTickets[0] : "------"}
							category={"Winning Number 1"}
						/>
					</div>
					<div>
						<WinningNumbers
							winningNumber={raffle.winningTickets[1]? raffle.winningTickets[1] : "------"}
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
							winningNumber={raffle.winningTickets[2]? raffle.winningTickets[2] : "------"}
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
