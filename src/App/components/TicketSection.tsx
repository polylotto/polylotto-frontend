import React, { useState } from "react";
import { OrderSummary } from "./OrderSummary";
import { Button, Form} from "semantic-ui-react";
import { CountdownTimer } from "./CountDownTimer";
import { CountdownDeactivated } from "./CountDownDeactivated";
import background from "../images/SVGPolylogo.svg";
import { useRaffleContext } from "../../context/raffle";
import {useUserContext} from "../../context/user";
import {useWeb3Context} from "../../context/web3";


// import { OrderSummary } from "./OrderSummary2"

interface TicketProps {
    title: string;
    amount: number;
    raffleCategory: number;
}

const TicketSection: React.FC<TicketProps> = ({
    title,
    amount,
    raffleCategory
}) => {
    const {state: userConnected} = useUserContext();
    const {state: account} = useWeb3Context();
    const [onShow, setOnShow] = useState(false);
    const [numTicket, setNumTicket] = useState("");
    const {state} = useRaffleContext();

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNumTicket(e.target.value);
    }

    function ticketFormHandler(_e: React.FormEvent<HTMLFormElement>) {
        if(numTicket){
            setOnShow(true);
        }
    }
    const nonActiveStates = ["0","5"];
    return(
        <>
            <div className="ticket-section">
                <div className="ticket-content">
                {(nonActiveStates.includes(state.currentRaffleState)) || state.deactivateRaffle? <CountdownDeactivated></CountdownDeactivated> : <CountdownTimer></CountdownTimer>}
                    <div className="ticket container">
                        <p className="ticket-type">{title} ${amount}</p>
                        <p className="randomizer"><span>Buy {title} Ticket(s)</span></p>

                        <Form onSubmit={ticketFormHandler}>
                            <Form.Group >
                                <input 
                                    placeholder="Number of Tickets"
                                    type="number"
                                    min={1}
                                    value={numTicket}
                                    onChange={onChange}
                                />
                                <Button className={"btn"} disabled={!(state.raffleOpen)}>
                                    Get Ticket
                                </Button>
                            </Form.Group>
                        </Form>   
                        {onShow? <OrderSummary type={title} amount={amount} numOfTickets={Number(numTicket)} raffleCategory={raffleCategory} setOnShow={setOnShow} isVisible={true}/> : <></>}
                    </div> 
                </div>
                <div  className="ticket-img">
                    <img src={background} alt="" />
                </div>
            </div>
            
        </>
    )
}
export default TicketSection;