import React, { useState } from 'react'
import "../css/prizepot.css"
import WinningCategory from './WinningCategory';
import { useRaffleContext } from '../../context/raffle';
import { formatBigNumber, convertTime } from '../../utils/utils';
import previous from "../images/previous.svg";
import next from "../images/next.svg";
import { getRaffle } from "../../api/raffle";
import { type } from 'os';

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
  

interface Props {
    raffleCategory: number;
}
const Slides: React.FC<Props> = ({
    raffleCategory
}) => {
    const INITIAL_STATE: RaffleData = {
        raffleID: 0,
        noOfTicketSold: 0,
        noOfPlayers: "",
        winners: [],
        winningTickets: [],
        winnersPayout: [],
        raffleStartTime: "",
        raffleEndTime: "",
        amountInjected: ""
    }
    const { state } = useRaffleContext();
    //@ts-ignore
    const categoryData: CategoryData = state.raffleCategoryData === []? 0 : state.raffleCategoryData[raffleCategory];
    const _raffle : RaffleData = categoryData? categoryData.currentRaffle : INITIAL_STATE;
    console.log(_raffle.raffleID);     
    const [raffleID, setRaffleID] = useState(_raffle.raffleID - 1);
    const [_r, setRaffle] = useState({});

    //@ts-ignore
    const raffle : RaffleData =  getRaffle({raffleCategory, raffleID}) 
    const [active, setActive] = React.useState(false);
    const handleActive = ()=>{
        active ? setActive(false): setActive(true)
    }   

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
    <div className=''>
        <div className="prizepot">
            <div className="prizepot-header">
                <h3>Round: {raffleID}</h3>
                <a href="/#" onClick={prevRaffle}><img src={previous} alt="disconnect" /></a>
                <a href="/#" onClick={nextRaffle}><img src={next} alt="disconnect" /></a>

                <small> Drawn {convertTime(Number(raffle.raffleEndTime))}</small>
            </div>

            <div className="prizepot-profit">
                <h2>Winning Tickets</h2>
                <div>
                   <small>{raffle.winningTickets[0]}</small>
                   <small>{raffle.winningTickets[1]}</small>
                   <small>{raffle.winningTickets[2]}</small>
                </div>
            </div>


             <div className="prizes">
                <div className={active ? "prizes-active": "prizes-hidden"}>
                    {/* <WinningCategory estimatedPayouts={estimatedWinningCategoryPayouts} /> */}
                </div>
            </div>
            <div className="details-btn" onClick={handleActive}>
                {!active ? <>
                    <span>Details</span> <span>&#9660;</span>
                </>: 
                    <>
                        <span>Hide</span> <span>&#9650;</span>
                    </>
                }
            </div>
            
        </div>

        
    </div>
  )
}

export default Slides;
