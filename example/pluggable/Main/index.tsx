import React from 'react';
import { Slot } from '../../../src';

const Main: React.FC = () => {
    return (
        <>
            <h3>Main Component</h3>
            <Slot name="main-content" />
        </>
    )
}

export default Main;