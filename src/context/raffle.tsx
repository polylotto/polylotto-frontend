import React, {
    useReducer,
    useEffect,
    createContext,
    useContext,
    useMemo
} from "react";

import { useWeb3Context } from "./web3";
import { get as getRaffle, getCountDown, subscribe} from "../api/raffle";

interface State {
    contractLinkBalance: string;
    currentRaffleEndTime: string;
    currentRaffleRebootEndTime: string;
    currentRaffleState: string;
    raffleCategoryData: CategoryData[];
    userTransactions: Transaction[];
    raffleOpen: boolean;
    deactivateRaffle: boolean;
    raffleStateMessage: string;
}

interface Transaction {
    txIndex: number;
    timestamp: number;
    raffleCategory: number;
    noOfTickets: number;
}
interface RaffleData {
    raffleID: number;
    noOfTicketSold: number;
    noOfPlayers: string;
    winners: string[];
    winningTickets: string[];
    winnersPayout: string[];
    raffleStartTime: string;
    raffleEndTime: string;
    amountInjected: string;
}
interface CategoryData {
    raffleCategory: number;
    rafflePool: string;
    currentRaffleState: string;
    currentRaffle: RaffleData;
    mostRecentRaffles: RaffleData[];
    userTicketsPerRaffle: string[];
}

const INITIAL_STATE: State = {
    contractLinkBalance: "0",
    currentRaffleEndTime: "0",
    currentRaffleRebootEndTime: "0",
    currentRaffleState: "0",
    raffleCategoryData: [],
    userTransactions: [],
    raffleOpen: false,
    deactivateRaffle: false,
    raffleStateMessage: "",
}

const SET = "SET";
const SET_COUNTDOWN = "SET_COUNTDOWN";
const ADD_USER_TX = "ADD_USER_TX";
const RAFFLE_OPEN = "RAFFLE_OPEN";
const RAFFLE_ENDED = "RAFFLE_ENDED";
const UPDATE_RAFFLE_OPEN = "UPDATE_RAFFLE_OPEN";
const DEACTIVATE_RAFFLE = "DEACTIVATE_RAFFLE";
const TICKETS_PURCHASED = "TICKETS_PURCHASED";

interface Set {
    type: "SET";
    data: {
        contractLinkBalance: string;
        currentRaffleState: string;
        raffleCategoryData: CategoryData[];
        userTransactions: Transaction[]
    }
}

interface SetCountDown {
    type: "SET_COUNTDOWN";
    data: {
        currentRaffleEndTime: string;
        currentRaffleRebootEndTime: string;
    }
}

interface TicketsPurchased {
    type: "TICKETS_PURCHASED";
    data: {
        raffleCategory: string;
        raffleId: string;
        tickets: string[];
        rafflePool: string;
        winnersPayout: string[];
    }
}

interface AddUserTx {
    type: "ADD_USER_TX";
    data: {
        txIndex: number;
        timestamp: number;
        raffleCategory: number;
        noOfTickets: number;
    }
}

interface RaffleOpen {
    type: "RAFFLE_OPEN";
    data: {
        raffleID: string;
        endTime: string;
        rebootTime: string;
        raffleState: string;
    }
}

interface RaffleEnded {
    type: "RAFFLE_ENDED";
    data: {
        raffleCategory: string;
        raffleId: string;
        raffleState: string;
    }
}

interface UpdateRaffleOpen {
    type: "UPDATE_RAFFLE_OPEN";
    raffleOpen: boolean;
}

interface DeactivateRaffle {
    type: "DEACTIVATE_RAFFLE";
    deactivateRaffle: boolean;
}


type Action = Set | SetCountDown | AddUserTx | RaffleOpen | RaffleEnded | UpdateRaffleOpen | DeactivateRaffle | TicketsPurchased

function reducer(state: State = INITIAL_STATE, action: Action) {
    switch (action.type) {
        case SET: {
            return {
                ...state,
                ...action.data,
            };
        }
        case SET_COUNTDOWN: {
            return {
                ...state,
                ...action.data,
            }
        }
        case ADD_USER_TX: {
            const {
                data: { txIndex, timestamp, raffleCategory, noOfTickets},
            } = action;

            const userTransactions = [
                {
                    txIndex,
                    timestamp,
                    raffleCategory,
                    noOfTickets,
                },
                ...state.userTransactions,
            ];

            return {
                ...state,
                userTransactions,
            };
        }

        case TICKETS_PURCHASED: {
            const {
                data: {raffleCategory, raffleId, tickets, rafflePool, winnersPayout},
            } = action;
            
            const raffleCategoryData = [...state.raffleCategoryData]
            
            const currentRaffleUpdate = {
                ...raffleCategoryData[Number(raffleCategory)].currentRaffle,
                winnersPayout: winnersPayout,
            }
            const oldUserTicketsPerRaffle = raffleCategoryData[Number(raffleCategory)].userTicketsPerRaffle;
            
            const categoryData = {
                ...raffleCategoryData[Number(raffleCategory)],
                currentRaffle: currentRaffleUpdate,
                raffleCategory: Number(raffleCategory),
                rafflePool: rafflePool,
                userTicketsPerRaffle: [ ...oldUserTicketsPerRaffle, ...tickets]
            }

            raffleCategoryData[Number(raffleCategory)] = categoryData;
            
            return {
                ...state,
                raffleCategoryData,
            }
        }

        case RAFFLE_OPEN: {
            const { 
                data: {endTime, rebootTime, raffleState}
            } = action
            return {
                ...state,
                currentRaffleEndTime: endTime,
                currentRaffleRebootEndTime: rebootTime,
                currentRaffleState: raffleState,
            };
        }

        case RAFFLE_ENDED: {
            const {
                data: {raffleState}
            } = action
            return {
                ...state,
                currentRaffleState: raffleState,
            };
        }

        case UPDATE_RAFFLE_OPEN: {
            const { raffleOpen } = action
            return {
                ...state,
                raffleOpen,
            };
        }

        case DEACTIVATE_RAFFLE: {
            const { deactivateRaffle } = action
            return {
                ...state,
                deactivateRaffle
            };
        }

        default:
            return state;
    }
}

interface SetInputs {
    contractLinkBalance: string;
    currentRaffleState: string;
    raffleCategoryData: CategoryData[];
    userTransactions: Transaction[]
}

interface SetCountDownInputs {
    currentRaffleEndTime: string;
    currentRaffleRebootEndTime: string;
}

interface AddUserTxInputs {
    txIndex: number;
    timestamp: number;
    raffleCategory: number;
    noOfTickets: number;
}

interface RaffleOpenInputs {
    raffleID: string;
    endTime: string;
    rebootTime: string;
    raffleState: string;
}

interface RaffleEndedInputs {
    raffleCategory: string;
    raffleId: string;
    raffleState: string;
}

interface TicketsPurchasedInputs {
    raffleCategory: string;
    raffleId: string;
    tickets: string[];
    rafflePool: string;
    winnersPayout: string[];
}

const RaffleContext = createContext({
    state: INITIAL_STATE,
    set: (_data: SetInputs) => {},
    setCountDown: (_data: SetCountDownInputs) => {},
    addUserTx: (_data: AddUserTxInputs) => {},
    ticketsPurchased: (_data: TicketsPurchasedInputs) => {},
    raffleOpen: (_data: RaffleOpenInputs) => {},
    raffleEnded: (_data: RaffleEndedInputs) => {},
    updateRaffleOpen: (_data: {raffleOpen: boolean}) => {},
    deactivateRaffle: (_data: {deactivateRaffle: boolean}) => {},

});

export function useRaffleContext() {
    return useContext(RaffleContext);
}

interface ProviderProps {}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    function set(data: SetInputs) {
        dispatch({
            type: SET,
            data,
        });
    }

    function setCountDown(data: SetCountDownInputs){
        dispatch({
            type: SET_COUNTDOWN,
            data,
        });
    }

    function addUserTx(data: AddUserTxInputs) {
        dispatch({
            type: ADD_USER_TX,
            data,
        });
    }

    function ticketsPurchased(data: TicketsPurchasedInputs) {
        dispatch({
            type: TICKETS_PURCHASED,
            data,
        });
    }

    function raffleOpen(data: RaffleOpenInputs){
        dispatch({
            type: RAFFLE_OPEN,
            data,
        })
    }

    function raffleEnded(data: RaffleEndedInputs){
        dispatch({
            type: RAFFLE_ENDED,
            data,
        })
    }
    function updateRaffleOpen(data: {raffleOpen: boolean}){
        dispatch({
            type: UPDATE_RAFFLE_OPEN,
            ...data,
        })
    }
    function deactivateRaffle(data: {deactivateRaffle: boolean}){
        dispatch({
            type: DEACTIVATE_RAFFLE,
            ...data,
        })
    }

    return (
        <RaffleContext.Provider
            value={useMemo(
                () => ({
                    state,
                    set,
                    setCountDown,
                    addUserTx,
                    ticketsPurchased,
                    raffleOpen,
                    raffleEnded,
                    updateRaffleOpen,
                    deactivateRaffle
                }),
                [state]
            )}
        >
            {children}
        </RaffleContext.Provider>
    );
};

export function Updater() {
    const {
        state: { account },
    } = useWeb3Context();
    const {
        set,
        setCountDown,
        addUserTx,
        ticketsPurchased,
        raffleEnded,
        raffleOpen,
    } = useRaffleContext()


    useEffect(() => {
        async function getCounter(account: string) {
            try {
                const data = await getCountDown(account);
                setCountDown(data);
            }catch(error){
                console.error(error);
            }
        }

        if(account) {
            getCounter(account);
        }
    }, [account]);

    useEffect(() => {
        async function get(account: string) {
            try {
                const data = await getRaffle(account);
                set(data);
            } catch (error){
                console.error(error);
            }
        }

        if (account) {
            get(account);
        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

    useEffect(() => {
        if (account) {
            return subscribe((error, log) => {
                if(error) {
                    console.error(error);
                }else if (log) {
                    switch (log.event) {
                        case "TicketsPurchased":
                            ticketsPurchased(log.returnValues);
                            break;
                        case "NewUserTransaction":
                            addUserTx(log.returnValues);
                            break;
                        case "RaffleOpen":
                            console.log("Open")
                            raffleOpen(log.returnValues);
                            break;
                        case "RaffleEnded":
                            raffleEnded(log.returnValues);
                            break;
                        default:
                            console.log(log);
                    }
                }
            });
        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);
    return null;
}






