import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import LandingLayout from "@/layouts/LandingLayout";
import ProfileEdit from "@/pages/Admin/ProfileEdit";

export default function AdminApp(): React.JSX.Element {

    return (
        <Router basename="/">
            <LandingLayout>
                <Routes>
                    <Route path="/" element={<ProfileEdit/>}/>
                </Routes>
            </LandingLayout>
        </Router>
    );
}