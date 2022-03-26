import React from "react";
import { Time } from "./Time";

interface Props {
}

export const CountdownDeactivated: React.FC<Props> =()=>{
    return (
        <>  
            <h4 className="center mt-5">No Ticket Sales At the Moment!</h4>
            <div className="countdown-timer">
                <Time hour={0} minute={0} second={0} />
            </div>
        </>
    );
    
}