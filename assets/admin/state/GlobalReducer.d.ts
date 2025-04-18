import { Reducer } from "react";
export type Action = {
    type: 'SIDEBAR_HIDE' | 'SIDEBAR_SHOW';
    payload: any;
};
export type GlobalState = {
    sidebarShow: boolean | undefined;
};
declare const GlobalReducer: Reducer<GlobalState, Action>;
export default GlobalReducer;
