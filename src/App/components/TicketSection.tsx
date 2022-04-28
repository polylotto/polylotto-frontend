import React, { useState } from "react";
import { OrderSummary } from "./OrderSummary";
import { Button, Form} from "semantic-ui-react";
import { CountdownTimer } from "./CountDownTimer";
import { CountdownDeactivated } from "./CountDownDeactivated";
import { connectWalletMetamask } from "../../api/web3"; 
import useAsync from "../../async/useAsync";
import background from "../images/SVGPolylogo.svg";
import { useRaffleContext } from "../../context/raffle";
import {useWeb3Context} from "../../context/web3";
import {useUserContext} from "../../context/user";
import PrizePot from "./PrizePot"

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
    
    const [onShow, setOnShow] = useState(false);
    const [numTicket, setNumTicket] = useState("");
    const {state} = useRaffleContext();

    const { state: { account }, updateAccount } = useWeb3Context();

    const {
        state: { userConnected },
        updateConnection,
    } = useUserContext();

    // eslint-disable-next-line
    const { pending, call } = useAsync(connectWalletMetamask);

    async function onClickConnect() {
        const { error, data } = await call(null);
        
        if (error) {
            console.error(error);
        }
        if(data) {
            updateAccount(data);
            updateConnection({userConnected: true});
        }
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNumTicket(e.target.value);
    }

    function ticketFormHandler(_e: React.FormEvent<HTMLFormElement>) {
        if(!(account && userConnected)){
            onClickConnect();
        }
        if(numTicket){
            setOnShow(true);
        }
    }
    const nonActiveStates = ["0","5"];
    
    function raffleCheck(){
        if(nonActiveStates.includes(state.currentRaffleState) || state.deactivateRaffle){
            return true;
        }else{
            return false;
        }
    }
    
    return(
        <>
            <div className="ticket-section">
                <div className="ticket-img">
                    <img src={background} alt="" />
                </div>
                
                <div className="ticket-content">
                {(raffleCheck())? <CountdownDeactivated></CountdownDeactivated> : <CountdownTimer></CountdownTimer>}
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
                                    disabled={raffleCheck()}
                                />
                                <Button className="btn btn-edit">
                                    {raffleCheck()? (state.currentRaffleState === "0")? (account && userConnected)? <i className="fa fa-circle-o-notch fa-spin"></i> : "Connect Wallet" : "No Tickets" :
                                        (state.currentRaffleEndTime === "0") ? <i className="fa fa-circle-o-notch fa-spin"></i> :
                                        "Buy Ticket"
                                    }
                                </Button>
                            </Form.Group>
                        </Form>   
                        {onShow? <OrderSummary type={title} amount={amount} numOfTickets={Number(numTicket)} raffleCategory={raffleCategory} setOnShow={setOnShow} isVisible={true}/> : <></>}
                    </div> 
                </div>
                {/* <div  className="ticket-img">
                    <img src={background} alt="" />
                </div> */}
            </div>
            <PrizePot raffleCategory={raffleCategory}/>
        </>
    );
}
export default TicketSection;