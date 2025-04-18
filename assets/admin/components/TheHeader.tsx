import React, { useContext } from "react";
import {
    CBreadcrumb,
    CBreadcrumbItem,
    CHeader,
    CHeaderBrand,
    CHeaderNav,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../state/GlobalStore";
import routes from "../routes";

const TheHeader = (): React.JSX.Element => {
    const [state, dispatch] = useContext(GlobalContext);

    const toggleSidebar = () => {
        if (state.sidebarShow) {
            dispatch({ type: "SIDEBAR_HIDE", payload: null });
        } else {
            dispatch({ type: "SIDEBAR_SHOW", payload: null });
        }
    };

    const renderBreadcrumbs = () => (
        <CBreadcrumb className="m-0 px-0 px-md-3">
            {routes.map((route, index) => (
                <CBreadcrumbItem key={index} /*active={route.active}*/>
                    {/*{route.active ? (*/}
                    {/*    route.name*/}
                    {/*) : (*/}
                        <Link to={route.path}>{route.name}</Link>
                    {/*)}*/}
                </CBreadcrumbItem>
            ))}
        </CBreadcrumb>
    );

    return (
        <CHeader>
            <button
                className="ml-md-3 d-lg-none"
                onClick={toggleSidebar}
            >
                <CIcon name="cil-menu" />
            </button>
            <button
                className="ml-3 d-md-down-none"
                onClick={toggleSidebar}
            >
                <CIcon name="cil-menu" />
            </button>
            <CHeaderBrand className="mx-auto d-lg-none">
                <Link to="/">
                    <CIcon name="logo" height={48} />
                </Link>
            </CHeaderBrand>

            <CHeaderNav className="d-md-down-none mr-auto">
                <Link className="px-3" to="/">
                    Dashboard
                </Link>
                <Link className="px-3" to="/profile">
                    Profile
                </Link>
            </CHeaderNav>

            <CHeaderNav className="px-3">
                {/* Add dropdowns or other header items here */}
            </CHeaderNav>

            <div className="px-3 justify-content-between">
                {renderBreadcrumbs()}
            </div>
        </CHeader>
    );
};

export default TheHeader;