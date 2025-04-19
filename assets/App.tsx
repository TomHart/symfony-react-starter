import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
// import GlobalStore from "./state/GlobalStore";
// import Loading from "./components/Loading";
// import Page404 from "./views/Page404";
// import Page500 from "./views/Page500";
import Layout from "./app/layout";
import Home from "./app/page";
import Login from "@/app/login";

export default function App(): React.JSX.Element {
    return (
        <Router basename="/">
            {/*<GlobalStore>*/}
            <Layout>
                <React.Suspense /*fallback={<Loading />}*/>
                    <Routes>
                        {/*<Route path="/404" element={<Page404 />} />*/}
                        {/*<Route path="/500" element={<Page500 />} />*/}
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </React.Suspense>
            </Layout>
            {/*</GlobalStore>*/}
        </Router>
    );
}