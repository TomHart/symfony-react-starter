import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import LandingLayout from "@/layouts/LandingLayout";
import Home from "@/pages/Landing/Home";
import Register from "@/pages/Landing/Register";
import Login from "@/pages/Landing/Login";

export default function LandingApp(): React.JSX.Element {

    return (
        <Router basename="/">
            <LandingLayout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </LandingLayout>
        </Router>
    );
}