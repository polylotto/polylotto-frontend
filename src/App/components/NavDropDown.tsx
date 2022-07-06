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

interface RaffleData {
    ID: number;
    noOfTicketsSold: number;
    noOfPlayers: string;
    winners: string[];
    winningTickets: string[];
    winnersPayout: string[];
    raffleStartTime: string;
    raffleEndTime: string;
    amountInjected: string;
    rollover: boolean;
}

interface CategoryData {
    raffleCategory: number;
    rafflePool: string;
    currentRaffleData: RaffleData;
    prevRaffleData: RaffleData;
    userTicketsPerRaffle: string[];
}

interface Transaction {
    txIndex: number;
    timestamp: number;
    raffleCategory: number;
    noOfTickets: number;
    description: string;
}

interface SetInputs {
    raffleID: number;
    raffleCategoryData: CategoryData[];
    userTransactions: Transaction[]
}


const NavDropDown: React.FC<Props> = () =>{

    const INITIAL_STATE: SetInputs = {
        raffleID: 0,
        raffleCategoryData: [],
        userTransactions: []
    }

    const SET_COUNTDOWN = {
        currentRaffleEndTime: "0",
        currentRaffleRebootEndTime: "0",
        raffleState: "0"
    }

    const {
        state: { account },
        updateAccount,
    } = useWeb3Context();

    const {
        updateConnection,
    } = useUserContext();

    const { state, set, setCountDown } = useRaffleContext();

    const [navOptionsState, setNavOptionsState] = useState(false);
    const [transcState, setTranscState] = useState(false);

    const toggleTransactionHistory = ()=>{
        transcState ? setTranscState(false) : setTranscState(true);
        setNavOptionsState(false);
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
        updateAccount({account: ""});
        set(INITIAL_STATE);
        setCountDown(SET_COUNTDOWN);
    }

    const toggleOff = (e: React.MouseEvent<HTMLAnchorElement>)=>{
        setNavOptionsState(false);
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
                            <li><a href={`https://mumbai.polygonscan.com/address/${account}`} onClick={toggleOff} target="_blank" rel="noopener noreferrer">Your Wallet</a></li>
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
    );
}

export default NavDropDown;