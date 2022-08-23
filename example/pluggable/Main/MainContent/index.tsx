import React, { useEffect } from 'react';
import { Slot, useRegister } from '../../../../src';

const MainContentSub: React.FC = () => {
    return <div>Main Content Sub</div>
}

const Main: React.FC = () => {

    const [, register] = useRegister();

    useEffect(() => {
        register.registerPlugin({
            name: 'main-content-sub',
            Component: MainContentSub
        })
    }, []);

    return (
        <div>
            <h4>Main Content</h4>
            <Slot name="main-content-sub" />
        </div>
    )
}

export default Main;