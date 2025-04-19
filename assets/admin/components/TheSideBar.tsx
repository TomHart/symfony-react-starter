import React, {useContext} from 'react';
import {CNavItem, CNavTitle, CSidebar, CSidebarBrand, CSidebarNav,} from '@coreui/react';
import {GlobalContext} from '../state/GlobalStore';

const TheSidebar = (): React.JSX.Element => {
    const [state, dispatch] = useContext(GlobalContext);

    const navigation = [
        {
            type: 'item',
            name: 'Dashboard',
            to: '/',
            // icon: <CIcon name="cil-speedometer" customClassName="nav-icon" />,
        },
        {
            type: 'title',
            name: 'Settings',
        },
        {
            type: 'item',
            name: 'Profile',
            to: '/profile',
            // icon: <CIcon name="cil-user" customClassName="nav-icon" />,
        },
    ];

    const renderNavItems = (items: typeof navigation) =>
        items.map((item, index) => {
            if (item.type === 'item') {
                return (
                    <CNavItem key={index} to={item.to}>
                        {/*{item.icon}*/}
                        {item.name}
                    </CNavItem>
                );
            }
            if (item.type === 'title') {
                return <CNavTitle key={index}>{item.name}</CNavTitle>;
            }
            return null;
        });

    return (
        <CSidebar
            visible={state.sidebarShow}

            onVisibleChange={(visible) => {
                dispatch({
                    type: visible ? 'SIDEBAR_SHOW' : 'SIDEBAR_HIDE',
                    payload: null,
                });
            }}
        >
            <CSidebarBrand className="d-md-down-none">
                {/*<CIcon*/}
                {/*    className="c-sidebar-brand-full"*/}
                {/*    name="logo-negative"*/}
                {/*    height={35}*/}
                {/*/>*/}
                {/*<CIcon*/}
                {/*    className="c-sidebar-brand-minimized"*/}
                {/*    name="sygnet"*/}
                {/*    height={35}*/}
                {/*/>*/}
            </CSidebarBrand>
            <CSidebarNav>{renderNavItems(navigation)}</CSidebarNav>
        </CSidebar>
    );
};

export default TheSidebar;