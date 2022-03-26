import React from "react"

interface Props {
    txIndex: number;
    timestamp: number;
    raffleCategory: number;
    noOfTickets: number;
}

export const TransactionDetails: React.FC<Props> = ({
    txIndex,
    timestamp,
    raffleCategory,
    noOfTickets
}) =>{
    const time = timestamp;
    const date = timestamp;
    return (
        <tr>
            <td>{txIndex}</td>
            <td>{time}</td>
            <td>{date}</td>
            <td>{raffleCategory}</td>
            <td>{noOfTickets}</td>
        </tr>
    )
}