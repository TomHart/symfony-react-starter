import React, {lazy} from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home";
import Loading from "@/pages/Loading";

export default function App(): React.JSX.Element {

    const Login = lazy(async () => {
        const [moduleExports] = await Promise.all([
            import("@/pages/Login"),
            new Promise(resolve => setTimeout(resolve, 3000))
        ]);
        return moduleExports;
    });

    return (
        <Router basename="/">
            <DefaultLayout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/loading" element={<Loading/>}/>
                    <Route
                        path="/login"
                        element={
                            <React.Suspense fallback={<Loading/>}>
                                <Login/>
                            </React.Suspense>
                        }
                    />
                </Routes>
            </DefaultLayout>
        </Router>
    );
}