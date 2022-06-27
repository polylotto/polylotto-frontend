import 'react-slideshow-image/dist/styles.css'
import React from 'react';
import { Slide } from 'react-slideshow-image';
import Slides from "./slides";
import "../css/prizepot.css"
import { useRaffleContext } from "../../context/raffle";

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

  
const Slideshow: React.FC<Props> = ({
  raffleCategory
}) => {
  const {state} = useRaffleContext();
  //@ts-ignore
  const categoryData: CategoryData = state.raffleCategoryData === []? 0 : state.raffleCategoryData[raffleCategory];
  const mostRecentRaffles: RaffleData[] = categoryData?  categoryData.mostRecentRaffles : [];

    return (
          <Slide easing="ease">
            {mostRecentRaffles.map( raffle => (
                <div key={raffle.raffleID} className="each-slide">
                    <Slides raffle={raffle}/>
               </div>
            )
            )}
          </Slide>
      )
};
  
export default Slideshow;