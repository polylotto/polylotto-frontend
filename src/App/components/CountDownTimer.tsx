import React from "react";
import { Time } from "./Time";
import { useRaffleContext } from "../../context/raffle";
import { useTimer } from "../../customHooks/useTimer";


interface Props {
}

export const CountdownTimer: React.FC<Props> =()=>{
    const {hour, minute, second } = useTimer();
    const { state } = useRaffleContext();
    if ((hour === 0 && minute === 0 && second === 0)){
        return (
            <>  
                <h4 className="center mt-5">Loading....</h4>
                <div className="countdown-timer">
                        <Time hour={0} minute={0} second={0} />
                </div>
            </>
        )
    }else{
        return (
            <>  
                <h4 className="center mt-5">{state.raffleOpen? "Ticket sales end in:" : "Next Ticket sales start in"}</h4>
                <div className="countdown-timer">
                        <Time hour={hour} minute={minute} second={second} />
                </div>
            </>
        )
    }
}