import React, {
    useReducer,
    useEffect,
    createContext,
    useContext,
    useMemo
} from "react";

import { useWeb3Context } from "./web3";
import { getData, getCountDown, subscribe} from "../api/raffle";
import {useUserContext} from "./user";

interface State {
    raffleID: number;
    currentRaffleEndTime: string;
    currentRaffleRebootEndTime: string;
    raffleCategoryData: CategoryData[];
    userTransactions: Transaction[];
    raffleOpen: boolean;
    deactivateRaffle: boolean;
    raffleState: string;
}

interface Transaction {
    txIndex: number;
    timestamp: number;
    raffleCategory: number;
    noOfTickets: number;
    description: string;
}

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

const INITIAL_STATE: State = {
    raffleID: 0,
    currentRaffleEndTime: "0",
    currentRaffleRebootEndTime: "0",
    raffleCategoryData: [],
    userTransactions: [],
    raffleOpen: false,
    deactivateRaffle: false,
    raffleState: "0",
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
        raffleCategoryData: CategoryData[];
        userTransactions: Transaction[]
    }
}

interface SetCountDown {
    type: "SET_COUNTDOWN";
    data: {
        currentRaffleEndTime: string;
        currentRaffleRebootEndTime: string;
        raffleState: string;
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
        user: string;
        raffleCategory: number;
        noOfTickets: number;
        description: string;
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
                data: { txIndex, timestamp, user, raffleCategory, noOfTickets, description},
            } = action;

            const userTransactions = [
                {
                    txIndex,
                    timestamp,
                    raffleCategory,
                    noOfTickets,
                    description,
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
                ...raffleCategoryData[Number(raffleCategory)].currentRaffleData,
                winnersPayout: winnersPayout,
            }
            const oldUserTicketsPerRaffle = raffleCategoryData[Number(raffleCategory)].userTicketsPerRaffle;
            
            const categoryData = {
                ...raffleCategoryData[Number(raffleCategory)],
                currentRaffleData: currentRaffleUpdate,
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
                raffleState: raffleState,
            };
        }

        case RAFFLE_ENDED: {
            const {
                data: {raffleState}
            } = action
            return {
                ...state,
                raffleState: raffleState,
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
    raffleID: number;
    raffleCategoryData: CategoryData[];
    userTransactions: Transaction[]
}

interface SetCountDownInputs {
    currentRaffleEndTime: string;
    currentRaffleRebootEndTime: string;
    raffleState: string;
}

interface AddUserTxInputs {
    txIndex: number;
    timestamp: number;
    user: string;
    raffleCategory: number;
    noOfTickets: number;
    description: string;
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

    const { updateFetchStatus } = useUserContext();
    const {
        set,
        setCountDown,
        addUserTx,
        ticketsPurchased,
        raffleEnded,
        raffleOpen,
        updateRaffleOpen,
        deactivateRaffle,
    } = useRaffleContext()


    useEffect(() => {
        async function get(account: string) {
            try {
                const data = await getData(account);
                set(data);
                updateFetchStatus({fetchComplete:true})
            } catch (error){
                console.error(error);
            }
        };

        async function getCounter(account: string) {
            try {
                const data = await getCountDown(account);
                setCountDown(data);
            }catch(error){
                console.error(error);
            }
        };

        if(account) {
            getCounter(account);
            get(account);
        }
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
                            if(account === log.returnValues.user){
                                addUserTx(log.returnValues);
                            }
                            break;
                        case "RaffleOpen":
                            raffleOpen(log.returnValues);
                            updateRaffleOpen({raffleOpen: true});
                            deactivateRaffle({ deactivateRaffle: false})
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






