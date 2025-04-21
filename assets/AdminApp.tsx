import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import LandingLayout from "@/layouts/LandingLayout";
import ProfileEdit from "@/pages/Admin/ProfileEdit";
import {UserProvider} from "@/provider/UserContext";

export default function AdminApp(): React.JSX.Element {

    return (
        <Router basename="/">
            <UserProvider>
                <LandingLayout>
                    <Routes>
                        <Route path="/" element={<ProfileEdit/>}/>
                    </Routes>
                </LandingLayout>
            </UserProvider>
        </Router>
    );
}