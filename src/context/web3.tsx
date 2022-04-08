import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from "react";
import { subscribeToAccount, subscribeToChainID, getChainID } from "../api/web3";
import { useUserContext } from "../context/user";
 

interface State {
    account: string;
    chainId: string;
}

const INITIAL_STATE: State = {
    account: "",
    chainId: "0x13881",
};


const LOCAL_STATE: State = {
  account: getLocalStorage("account"),
  chainId: "0x13881",
}

function getLocalStorage(item: string){
  const _localState = localStorage.getItem(item);
  const localState : string = _localState !== null? JSON.parse(_localState) : "";
  return localState;
}


const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
const UPDATE_CHAIN_ID = "UPDATE_CHAIN_ID";

interface UpdateAccount {
    type: "UPDATE_ACCOUNT";
    account: string;
}

interface UpdateChainId {
  type: "UPDATE_CHAIN_ID";
  chainId: string;
}

type Action = UpdateAccount | UpdateChainId;


function reducer(state: State = LOCAL_STATE || INITIAL_STATE, action: Action) {
    switch (action.type) {
        case UPDATE_ACCOUNT: {
            const { account } = action;
            return {
                ...state,
                account,
            };
        }
        case UPDATE_CHAIN_ID: {
          const { chainId } = action;
          return {
              ...state,
              chainId,
          }
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
    const {updateConnection} = useUserContext();
  
    useEffect(() => {
      if (state.account) {
        const unsubscribe = subscribeToAccount((error, account) => {
          if (error) {
            console.error(error);
          }
          if(account === "locked"){
            updateAccount({account:""})
            updateConnection({userConnected:false});
          }
          if (account !== "" && account !== state.account) {
            updateAccount({account})
          }
        });
        return unsubscribe;
      }
    }, [state.account]);

    useEffect(() => {
      if(state.account){
        const unsubscribeChain = getChainID((error, chainId) => {
          if (error) {
            console.error(error);
          }
          if(chainId){
             if (chainId !== state.chainId){
               subscribeToChainID();
            }
          }
        });
        
        return unsubscribeChain;
      }
    }, [state.account, state.chainId])
    return null;
  }
  