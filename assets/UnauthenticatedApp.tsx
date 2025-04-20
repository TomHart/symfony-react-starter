import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
import Home from "@/pages/Unauthenticated/Home";
import Register from "@/pages/Unauthenticated/Register";
import Login from "@/pages/Unauthenticated/Login";

export default function UnauthenticatedApp(): React.JSX.Element {

    return (
        <Router basename="/">
            <UnauthenticatedLayout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </UnauthenticatedLayout>
        </Router>
    );
}