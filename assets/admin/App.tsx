import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStore from "./state/GlobalStore";
import Loading from "./components/Loading";
import Page404 from "./views/Page404";
import Page500 from "./views/Page500";
import DefaultLayout from "./layout/DefaultLayout";

export default function App(): React.JSX.Element {
    return (
        <Router basename="/admin">
            <GlobalStore>
                <React.Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/404" element={<Page404 />} />
                        <Route path="/500" element={<Page500 />} />
                        <Route path="/*" element={<DefaultLayout />} />
                    </Routes>
                </React.Suspense>
            </GlobalStore>
        </Router>
    );
}