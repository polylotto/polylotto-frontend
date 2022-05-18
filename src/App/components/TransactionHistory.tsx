import React, {
    Dispatch,
    SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import { TransactionDetails } from "./TransactionDetail";

interface Transaction {
    txIndex: number;
    timestamp: number;
    raffleCategory: number;
    noOfTickets: number;
}

interface Props {
    data: Transaction[]
    setTranscState: Dispatch<SetStateAction<boolean>>;
}
const TranscHistory: React.FC<Props> = ({
    data,
    setTranscState
}) =>{
    const hideTansactions = () => {
        setTranscState(false)
    }
    return createPortal(
        <div  className="modal_styling">
            <div  className="transactions">
                <p><span onClick={hideTansactions}>&times;</span></p>
                <table>
                    <thead>
                            <tr>
                                {/* <th>Transaction ID</th> */}
                                {/* <th>Time</th> */}
                                <th>Date</th>
                                <th>Game Type</th>
                                <th>No. Ticket</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(tx => (
                                <tr key={tx.txIndex}>
                                    <TransactionDetails timestamp={tx.timestamp} raffleCategory={tx.raffleCategory} noOfTickets={tx.noOfTickets}/>        
                                </tr>
                            ))}                        
                        </tbody>
                </table>
            </div>
        </div>, document.querySelector("body")!
    );
}

export default TranscHistory;