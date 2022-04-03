import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from "react";
import { subscribeToAccount } from "../api/web3";


interface State {
    account: string;
}

const INITIAL_STATE: State = {
    account: "",
};


const LOCAL_STATE: State = {
  account: getLocalStorage()
}

function getLocalStorage(){
  const _localState= localStorage.getItem("account");
  const localState : string = _localState !== null? JSON.parse(_localState) : "";
  return localState;
}

const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";

interface UpdateAccount {
    type: "UPDATE_ACCOUNT";
    account: string;
}

type Action = UpdateAccount;


function reducer(state: State = LOCAL_STATE || INITIAL_STATE, action: Action) {
    switch (action.type) {
        case UPDATE_ACCOUNT: {
            const { account } = action;
            return {
                ...state,
                account,
            };
        }
        default:
            return state;
    }
}

const Web3Context = createContext({
    state: LOCAL_STATE || INITIAL_STATE,
    updateAccount: (_data: {account: string}) => {},
});

export function useWeb3Context() {
    return useContext(Web3Context);
}

interface ProviderProps {}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, LOCAL_STATE || INITIAL_STATE);

    function updateAccount(data: { account: string;}) {
        dispatch({
            type: UPDATE_ACCOUNT,
            ...data,
        });
    }
    
    useEffect(() => {
      localStorage.setItem("account", JSON.stringify(state.account));
    })

    return (
      <Web3Context.Provider
        value={useMemo(
          () => ({
            state,
            updateAccount,
          }),
          [state]
        )}
      >
        {children}
      </Web3Context.Provider>
    );
};

export function Updater() {
    const { state, updateAccount } = useWeb3Context();
  
    useEffect(() => {
      if (state.account) {
        const unsubscribe = subscribeToAccount((error, account) => {
          if (error) {
            console.error(error);
          }
          if (account !== "" && account !== state.account) {
            updateAccount({account})
          }
        });
  
        return unsubscribe;
      }
    }, [state.account]);
    return null;
  }
  