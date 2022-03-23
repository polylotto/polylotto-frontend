import React, {
    createContext,
    useContext,
    useMemo,
    useReducer,
    useEffect,
} from "react";

interface State {
    userConnected: boolean | null;
}


const INITIAL_STATE: State = {
    userConnected: false
};

function getLocalStorage(){
    const _localStorage = localStorage.getItem("UserConnected");
    const localState : string = _localStorage !== null? JSON.parse(_localStorage) : "";
    if(localState === 'true'){
        return true;
    }else if(localState === 'false'){
        return false;
    }else{
        return null
    }
}

function setLocalStorage(userConnected: Boolean | null){
    if(userConnected === null){
        return
    }
    let value : string;
    if(userConnected){
        value = 'true';
    }else{
        value = 'false';
    }
    localStorage.setItem("UserConnected", JSON.stringify(value));
}


const LOCAL_STATE: State = {
    userConnected: getLocalStorage()
}

const UPDATE_CONNECTION = "UPDATE_CONNECTION";

interface UpdateConnection {
    type: "UPDATE_CONNECTION";
    userConnected: boolean;
}

type Action = UpdateConnection;

function reducer(state: State = LOCAL_STATE || INITIAL_STATE, action: Action) {
    switch (action.type) {
        case UPDATE_CONNECTION: {
            const { userConnected } = action;
            return {
                ...state,
                userConnected,
            };
        }
        default:
            return state;
    }
}

const UserContext = createContext({
    state: LOCAL_STATE || INITIAL_STATE,
    updateConnection: (_data: {userConnected: boolean}) => {},
});


export function useUserContext() {
    return useContext(UserContext);
}

interface ProviderProps {}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, LOCAL_STATE || INITIAL_STATE);

    function updateConnection(data: {userConnected: boolean}) {
        dispatch({
            type: UPDATE_CONNECTION,
            ...data,
        });
    }

    useEffect(() =>{
        setLocalStorage(state.userConnected)
    })

    return (
        <UserContext.Provider
        value={useMemo(
          () => ({
            state,
            updateConnection,
          }),
          [state]
        )}
      >
        {children}
      </UserContext.Provider>
    );
};