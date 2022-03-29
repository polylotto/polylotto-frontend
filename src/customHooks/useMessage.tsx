import { useEffect, useState } from "react";
import { useUserContext } from "../context/user";
import { useWeb3Context } from "../context/web3";
import * as raffle from "../api/raffle";

export function useMessage(){
   
    const [ message, setMessage] = useState("Checking Approval")

    const {state: { userConnected }} = useUserContext();

    const {state: {account} } = useWeb3Context();

    const handleMessage = async () => {
      if(account && userConnected){
        const allowance = await raffle.checkAllowance(account);
      
        if(allowance){
          setMessage("Pay Now")
        }else{
          setMessage("Approve")
      }
      }else{
        setMessage("Connect Wallet")
      }
    };

    useEffect(()=> {
      handleMessage();
      //eslint-disable-next-line
    }, [])

    return message;
}
