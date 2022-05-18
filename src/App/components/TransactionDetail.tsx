import React from "react"
import { convertTime } from "../../utils/utils"
interface Props {
    timestamp: number;
    raffleCategory: number;
    noOfTickets: number;
}

export const TransactionDetails: React.FC<Props> = ({
    timestamp,
    raffleCategory,
    noOfTickets
}) =>{
    // const time = timestamp;
    const date = convertTime(timestamp);

    function categorise(raffleCategory: number){
        console.log(raffleCategory);
        switch (raffleCategory.toString()) {
            case "0": 
                return "Basic"
            
            case "1": 
                return "Investor"
            
            case "2": 
                return "Whale"
            
            default:
                return "Error";
        }

    }
    return (
        <>
            {/* <td>{time}</td> */}
            <td>{date}</td>
            <td>{categorise(raffleCategory)}</td>
            <td>{noOfTickets}</td>
        </>
    );
}