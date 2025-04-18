import React from "react";
export type Route = {
    path: string;
    exact?: boolean;
    component: React.FunctionComponent<any>;
    name: string;
};
declare const routes: Route[];
export default routes;
