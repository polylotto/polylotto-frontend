import { useEffect, useState } from "react";
// import { dateValue } from "../api/DateValue";
import { useRaffleContext } from "../context/raffle";

interface timerProps {
    hour: number;
    minute: number;
    second: number;
}

export function useTimer(){

    const { state, updateRaffleOpen, deactivateRaffle } = useRaffleContext();

    const _endTime = state.currentRaffleEndTime;

    const _rebootTime = state.currentRaffleRebootEndTime;

    const [hour, setHour] = useState(Number)
    const [minute, setMinute] = useState(Number);
    const [second, setSecond] = useState(Number);

    const workingTimer = ()=>{
        let countDate;
        const endTime = new Date(_endTime).getTime();
        const rebootTime = new Date(_rebootTime).getTime(); 
        const now = new Date().getTime();

        if(now < endTime){
            updateRaffleOpen({raffleOpen: true});
            countDate = endTime;
        }else {
            updateRaffleOpen({raffleOpen: false});
            countDate = rebootTime;
        }

        if(now > rebootTime){
            deactivateRaffle({ deactivateRaffle: true})
        }
        
        const gap = countDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        if(gap < 0) {
            setHour(0)
            setMinute(0)
            setSecond(0);
        }else{
            setHour(()=> Math.floor((gap / hour)));
            setMinute(() => Math.floor((gap % hour) / minute));
            setSecond(()=> Math.floor((gap % minute) / second));
        }
    }

    useEffect(()=> {
        const timer = setInterval(workingTimer, 1000);
        return () => clearInterval(timer);
        //eslint-disable-next-line
    }, [])

    const timer: timerProps ={
        hour,
        minute,
        second,
    }
    return timer;
}