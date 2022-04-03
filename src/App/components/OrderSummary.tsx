import { StyledModal } from "../StyledComponents/Modal.styles";
import React, {Dispatch, SetStateAction, useState} from "react";
import reactDom from "react-dom";
import { useWeb3Context } from "../../context/web3";
import { Button } from "semantic-ui-react";
import useAsync from "../../async/useAsync";
import * as raffle from "../../api/raffle";
import { useMessage } from "../../customHooks/useMessage";
import { generateRandomTickets } from "../../api/randomNumber";
import "../css/switch.css";


interface Props {
  type: string;
  amount: number;
  raffleCategory: number;
  numOfTickets: number;
  setOnShow: Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
}

export const OrderSummary: React.FC<Props> = ({type, amount, raffleCategory, numOfTickets, setOnShow, isVisible }) =>{

  const [checked, setChecked] = useState(false);


  const onCheck = ()=>{
    checked ? setChecked(false) : setChecked(true)
  }

  const { state: { account } } = useWeb3Context();

  const message = useMessage();

  const approve = useAsync(async () => {
    if(!account){
      throw new Error("Not connected");
    }
    const _amount = (amount*numOfTickets).toString();
    const infiniteApproval = checked;
    await raffle.approve(account, {_amount, infiniteApproval})
  
  })

  const buyTickets = useAsync(async () => {
    if(!account){
      throw new Error("Not connected");
    }
    const tickets = generateRandomTickets(numOfTickets);
    await raffle.buyTickets(account, {raffleCategory, tickets})
  })


  const handleModalHide = ()=>{
    setOnShow(false);
    isVisible = false;
    setChecked(false);
  }

  const handlePay = () => {
    if(message === "Approve"){
      handleModalHide();
      approve.call(null);
    } else if(message === "Pay Now"){
      handleModalHide();
      buyTickets.call(null);
    }
  }
    return reactDom.createPortal(
      <div className={`bg-1`}>
        <StyledModal isVisible={isVisible}>
        <p className="close-btn" onClick={handleModalHide}>X</p>
        <h2>Order Summary</h2>
        <div className="flex bg-1"><p className="text-muted">Ticket Type</p> <p>{type}</p></div>
        <div className="flex"><p className="text-muted">Ticket Cost</p> <p>${amount}</p></div>

        <div className="">
          <div className="flex"><p className="text-muted">No. of Ticket</p> <p>{numOfTickets}</p></div>

          <div className="flex">
            <p className="allowance"><span className="text-muted" >Allowance</span> <span className="toolTip-icon" data-tooltip={!checked ? "Only the exact amount is allowed to be transferred. You will need to reapprove for subsequent transaction." : "Be aware of the riskes of giving infinite approval to smart contract address."}>&#8505;</span></p>
             
            <p className="switch">
              <small>{!checked ? "Exact Amount" : "Infinite"}</small>
              <input type="checkbox" className="allowance-checkbox"  checked={checked} onChange={e => {}} id="checkboxToggler"/>
              <label htmlFor="checkboxToggler" onClick={onCheck}></label>
            </p>
          </div>

          <div className="flex"><h4>Total Amount</h4><h4>${amount*numOfTickets}</h4></div>
        </div>
          <>
          <div className="mt-5"><Button className="btn" onClick={handlePay}>{useMessage()}</Button></div>
          </>
      </StyledModal>
      </div>, document.querySelector("body")!
    )
}