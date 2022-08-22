import React from 'react';
import { PluginProvided, Slot } from '../../../src';

const Header: React.FC<PluginProvided> = ({ eventHandler }) => {

    const handleClick = () => {
        eventHandler.send("changeText", "你好呀", "heihei")
    }

    return (
        <div onClick={handleClick}>
            <h3>Header Component</h3>
            <Slot name="header-content" />
        </div>
    )
}

export default Header;