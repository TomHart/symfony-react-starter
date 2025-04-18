import React, { ReactNode } from "react";
import { Action, GlobalState } from "./GlobalReducer";
interface GlobalStoreProps {
    children: ReactNode;
}
declare const GlobalStore: React.FunctionComponent<GlobalStoreProps>;
export declare const GlobalContext: React.Context<[GlobalState, React.Dispatch<Action>]>;
export default GlobalStore;
