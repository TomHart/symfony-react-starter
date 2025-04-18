import React, { createContext, Dispatch, useReducer, ReactNode } from "react";
import GlobalReducer, { Action, GlobalState } from "./GlobalReducer";

const initialState: GlobalState = {
    sidebarShow: true // 'responsive',
};

interface GlobalStoreProps {
    children: ReactNode;
}

const GlobalStore: React.FunctionComponent<GlobalStoreProps> = ({ children }) => {
    const [state, dispatch] = useReducer(GlobalReducer, initialState);
    return (
        <GlobalContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalContext.Provider>
    );
};

export const GlobalContext = createContext<[GlobalState, Dispatch<Action>]>([initialState, () => null]);

export default GlobalStore;