import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUserContext } from "../context/user";
import { useWeb3Context } from "../context/web3";
import * as raffle from "../api/raffle";

export function useMessage( isApproving: boolean, isBuying: boolean, buyingComplete: Dispatch<SetStateAction<boolean>>, toggleOff: Dispatch<SetStateAction<boolean>>){
   
    const [ message, setMessage] = useState("Checking Approval")

    const [hasBought, setBought] = useState(false)

    const {state: { userConnected }} = useUserContext();

    const {state: {account} } = useWeb3Context();

    function toggle(){
      toggleOff(false);
    }

    useEffect(()=> {

      const handleMessage = async () => {
        if(account && userConnected){
          const allowance = await raffle.checkAllowance(account);

          if(isApproving || isBuying){
            setMessage("");
            if(isBuying){
              setBought(true);
            }
          }else if(allowance){
            setMessage("Pay Now")
          }else{
            setMessage("Approve")
          }
          
          if(hasBought && !isBuying){
            buyingComplete(true);
            setTimeout(toggle, 5000);
          }
  
        }
      };
      
      handleMessage();
      //eslint-disable-next-line
      // return () => {
      //   setMessage(""); // This worked for me
      // };
    }, [isApproving, isBuying])

    return message? message : <i className="fa-solid fa-circle-notch fa-spin"></i>;
}
