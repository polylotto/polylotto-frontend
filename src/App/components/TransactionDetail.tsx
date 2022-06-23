import React from "react"
import {returnTimeAndDate } from "../../utils/utils"
interface Props {
    timestamp: number;
    raffleCategory: number;
    noOfTickets: number;
    description: string;
}

export const TransactionDetails: React.FC<Props> = ({
    timestamp,
    raffleCategory,
    noOfTickets,
    description
}) =>{
    const date = returnTimeAndDate(timestamp);

    function categorise(raffleCategory: number){
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
            
            <td>{date[0]}</td>
            <td>{date[1]}</td>
            <td>{categorise(raffleCategory)}</td>
            <td>{description}</td>
            <td>{noOfTickets}</td>
        </>
    );
}