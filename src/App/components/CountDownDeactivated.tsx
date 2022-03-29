import React from "react";
import { Time } from "./Time";
import {useUserContext} from "../../context/user";
import {useWeb3Context} from "../../context/web3";
import {useRaffleContext} from "../../context/raffle"

interface Props {
}

export const CountdownDeactivated: React.FC<Props> =()=>{

    const {state} = useRaffleContext();

    const {state: { userConnected }} = useUserContext();
    const { state: { account } } = useWeb3Context();
    return (
        <>  
            <h4 className="center mt-5">{!(account && userConnected)? "Connect Wallet to use DApp!" : state.raffleStateMessage? state.raffleStateMessage: "No Ticket Sales At the Moment!" }</h4>
            <div className="countdown-timer">
                <Time hour={0} minute={0} second={0} />
            </div>
        </>
    );
    
}