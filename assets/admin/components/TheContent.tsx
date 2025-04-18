import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CContainer } from '@coreui/react';

import routes from '../routes';
import Loading from './Loading';

const TheContent: React.FunctionComponent = () => {
    return (
        <main className="c-main">
            <CContainer fluid>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {routes.map((route, idx) => {
                            return route.component ? (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    element={<route.component />}
                                />
                            ) : null;
                        })}
                        <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                </Suspense>
            </CContainer>
        </main>
    );
};

export default TheContent;