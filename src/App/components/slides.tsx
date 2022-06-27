import React from 'react'
import "../css/prizepot.css"
import WinningCategory from './WinningCategory';
import { useRaffleContext } from '../../context/raffle';
import { formatBigNumber, convertTime } from '../../utils/utils';

interface RaffleData {
    raffleID: number;
    raffleStartTime: string;
    noOfTicketSold: number;
    noOfPlayers: string;
    winners: string[];
    winningTickets: string[];
    winnersPayout: string[];
}

interface Props {
    raffle: RaffleData;
}
const Slides: React.FC<Props> = ({
    raffle
}) => {

    const prizepot = Number(raffle.winnersPayout[0]) + Number(raffle.winnersPayout[1]) + Number(raffle.winnersPayout[2])
    const [active, setActive] = React.useState(false);
    const handleActive = ()=>{
        active ? setActive(false): setActive(true)
    }   
    return (
    <div className=''>
        <div className="prizepot">
            <div className="prizepot-header">
                <h3>Raffle ID: {raffle.raffleID}, {convertTime(Number(raffle.raffleStartTime))}</h3>
            </div>

            <div className="prizepot-profit">
                <h2>Total No Of Players</h2>
                <div>
                   <small>{raffle.noOfPlayers}</small>
                </div>
            </div>

            <div className="your-tickets">
                <h2>Tickets Sold</h2>
                <div> 
                    <p>{raffle.noOfTicketSold}</p>
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
