import React, { useState } from "react";
import { createPortal } from "react-dom";
import wallet from "../images/wallet.svg";
import down from "../images/down.svg";
import logout from "../images/logout.svg";
import TranscHistory from "./TransactionHistory";
import "../css/transactions.css";
import { useWeb3Context } from "../../context/web3";
import { useUserContext } from "../../context/user";
import { useRaffleContext } from "../../context/raffle";

interface Props {}

const NavDropDown: React.FC<Props> = () =>{
    const {
        state: { account },
        updateAccount,
    } = useWeb3Context();

    const {
        updateConnection,
    } = useUserContext();

    const { state } = useRaffleContext();

    const [navOptionsState, setNavOptionsState] = useState(false);
    const [transcState, setTranscState] = useState(false);

    const toggleTransactionHistory = ()=>{
        transcState ? setTranscState(false) : setTranscState(true);
    }

    const toggleNavOption = (e: React.MouseEvent<HTMLAnchorElement>)=>{
        e.preventDefault();

        // toggles Nav dropDown. "ON(true) or OFF(false)"
        !navOptionsState ? setNavOptionsState(true) : setNavOptionsState(false)
    }
    const disconnect = (e: React.MouseEvent<HTMLAnchorElement>)=>{
        e.preventDefault();

        //  sets The "Connected Status" to "Disconnected". DUMMY_LOGIC: Nav dropdown and connect state
        //  is set to false. 
        setNavOptionsState(false);
        updateConnection({userConnected: false});
        updateAccount({account: ""})
    }

    return (
        <>
            <li  className="wallet-nav">
                <div className="wallet"><img src={wallet} alt="wallet"/></div>
                <a href="/" onClick={toggleNavOption}>
                    <img src={down} className="down" alt="home icon"/>
                </a>
            </li>
            {
                !navOptionsState ? <></> : createPortal(
                    <div className="nav-options">
                        <ul>
                            <li><a href={`https://mumbai.polygonscan.com/address/${account}`} target="_blank" rel="noopener noreferrer">Your Wallet</a></li>
                            <li><a href="# " onClick={toggleTransactionHistory}>Recent Transactions</a></li>
                            <hr />
                            <li className="disconnect">
                                <p>Disconnect</p>
                                <a href="/#" onClick={disconnect}><img src={logout} alt="disconnect" /></a>
                            </li>
                        </ul>
                    </div>, document.querySelector("body")!
                )
            }

            {
                transcState ? <TranscHistory data={state.userTransactions} setTranscState={setTranscState}/> : <></>
            }
        </>
    )
}

export default NavDropDown;