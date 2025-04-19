import React from "react";
import TheSidebar from "../components/TheSideBar";
import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import TheContent from "../components/TheContent";
import { CContainer } from "@coreui/react";

const DefaultLayout: React.FunctionComponent<any> = () => {
    return (
        <div className="d-flex min-vh-100">
            {/* Sidebar */}
            <div className="bg-light border-end">
                <TheSidebar />
            </div>

            {/* Main content area */}
            <div className="flex-grow-1 d-flex flex-column">
                {/* Optional Header */}
                 <TheHeader />

                <main className="flex-grow-1 p-3">
                    <CContainer fluid>
                        <TheContent />
                    </CContainer>
                </main>

                <TheFooter />
            </div>
        </div>
    )
}

export default DefaultLayout
