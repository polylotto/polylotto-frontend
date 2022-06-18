import { StyledModal } from "../StyledComponents/Modal.styles";
import React, {Dispatch, SetStateAction, useRef, useState} from "react";
import reactDom from "react-dom";
import { useWeb3Context } from "../../context/web3";
import { Button } from "semantic-ui-react";
import useAsync from "../../async/useAsync";
import * as raffle from "../../api/raffle";
import { useMessage } from "../../customHooks/useMessage";
import { generateRandomTickets } from "../../api/randomNumber";
import "../css/switch.css";
import { RoundTickets } from './RoundTickets';


interface Props {
  type: string;
  amount: number;
  raffleCategory: number;
  numOfTickets: number;
  setOnShow: Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
  raffleId: number;
}

export const OrderSummary: React.FC<Props> = ({type, amount, raffleCategory, numOfTickets, setOnShow, isVisible, raffleId }) =>{

  // const [checked, setChecked] = useState(false);
  const [purchaseCompleted, setWatcher] = useState(false);
  const [tickets, setTickets] = useState([]);
  
  const currentMessage = useRef(null);

  // const onCheck = ()=>{
  //   checked ? setChecked(false) : setChecked(true)
  // }

  const { state: { account } } = useWeb3Context();

  const approve = useAsync(async () => {
    if(!account){
      throw new Error("Not connected");
    }
    await raffle.approve(account)
  
  })

  const buyTickets = useAsync(async () => {
    if(!account){
      throw new Error("Not connected");
    }
    const tickets = generateRandomTickets(numOfTickets);
    console.log(tickets);
    await raffle.buyTickets(account, {raffleCategory, tickets})
    // @ts-ignore
    setTickets(tickets);
  })


  const handleModalHide = ()=>{
    setOnShow(false);
    isVisible = false;
  }

  const handlePay = () => {
    // @ts-ignore
    const message = currentMessage.current.props.children;
    if(message === "Approve"){
      approve.call(null);
      if(approve.error){
        console.error(approve.error);
      }
    } else if(message === "Pay Now"){
      buyTickets.call(null);
      if(buyTickets.error){
        console.error(buyTickets.error);
      }
    } else {
      return;
    }
  }
    return reactDom.createPortal(
      <>
        <div className={`bg-1`}>
          <StyledModal isVisible={isVisible}>
            <p className="close-btn" onClick={handleModalHide}>X</p>
            <h2>Order Summary</h2>
            <div className="flex bg-1"><p className="text-muted">Ticket Type</p> <p>{type}</p></div>
            <div className="flex"><p className="text-muted">Ticket Cost</p> <p>${amount}</p></div>

            <div className="">
              <div className="flex"><p className="text-muted">No. of Ticket</p> <p>{numOfTickets}</p></div>

              {/* <div className="flex">
                <p className="allowance"><span className="text-muted" >Allowance</span> <span className="toolTip-icon" data-tooltip={!checked ? "Only the exact amount is allowed to be transferred. You will need to reapprove for subsequent transaction." : "Be aware of the riskes of giving infinite approval to smart contract address."}>&#8505;</span></p>
                
                <p className="switch">
                  <small>{!checked ? "Exact Amount" : "Infinite"}</small>
                  <input type="checkbox" className="allowance-checkbox"  checked={checked} onChange={e => {}} id="checkboxToggler"/>
                  <label htmlFor="checkboxToggler" onClick={onCheck}></label>
                </p>
              </div> */}

              <div className="flex"><h4>Total Amount</h4><h4>${amount*numOfTickets}</h4></div>
            </div>
            <>
              <div className="mt-5"><Button className="btn" onClick={handlePay} ref={currentMessage}>{useMessage(approve.pending, buyTickets.pending, setWatcher, setOnShow)}</Button></div>
            </>
          </StyledModal>
        </div>
      {purchaseCompleted && tickets? 
        <RoundTickets setTicketModal={setWatcher} tickets={tickets} raffleID={raffleId}></RoundTickets> 
      :
        <></>      
      }
      </>, document.querySelector("body")!
    )
}