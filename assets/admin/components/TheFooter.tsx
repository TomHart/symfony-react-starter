import React from 'react'
import {
    CFooter,
} from '@coreui/react'

const TheFooter = (): React.JSX.Element => {
    return (
        <CFooter position={'sticky'}>
            <div>
                {(new Date).getFullYear()}
            </div>
            <div className="mfs-auto">
                <span className="mr-1">Powered by</span>
                <a href="https://bogomolov.tech" target="_blank" rel="noopener noreferrer">bogomolov.tech</a>
            </div>
        </CFooter>
    )
}

export default TheFooter;
