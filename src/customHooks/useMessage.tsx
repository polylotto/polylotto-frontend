import { useEffect, useState } from "react";
import { useUserContext } from "../context/user";
import { useWeb3Context } from "../context/web3";
import * as raffle from "../api/raffle";

export function useMessage( isApproving: boolean, isBuying: boolean){
   
    const [ message, setMessage] = useState("Checking Approval")

    const {state: { userConnected }} = useUserContext();

    const {state: {account} } = useWeb3Context();

    useEffect(()=> {

      const handleMessage = async () => {
        if(account && userConnected){
          const allowance = await raffle.checkAllowance(account);

          if(isApproving || isBuying){
            setMessage("")
          }else if(allowance){
            setMessage("Pay Now")
          }else{
            setMessage("Approve")
          }
  
        }
      };
      
      handleMessage();
      //eslint-disable-next-line
      // return () => {
      //   setMessage(""); // This worked for me
      // };
    }, [isApproving, isBuying])

    return message? message : <i className="fa fa-circle-o-notch fa-spin"></i>;
}
