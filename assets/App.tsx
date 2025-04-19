import React, {lazy} from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "@/app/layout";
import Home from "@/app/page";
import Loading from "@/app/Loading";

const Login = lazy(async () => {
    const [moduleExports] = await Promise.all([
        import("@/app/login"),
        new Promise(resolve => setTimeout(resolve, 3000))
    ]);
    return moduleExports;
});

export default function App(): React.JSX.Element {
    return (
        <Router basename="/">
            <Layout>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route
                            path="/login"
                            element={
                                <React.Suspense fallback={<Loading />}>
                                    <Login />
                                </React.Suspense>
                            }
                        />
                    </Routes>
            </Layout>
        </Router>
    );
}