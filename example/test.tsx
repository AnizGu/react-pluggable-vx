import React, { useState } from 'react';
import { createPlugin } from "../src";
import { PluginProvided } from '../src/typings';

const Test: React.FC<PluginProvided> = ({ eventHandler }) => {
    const [text, setText] = useState('Test Plugin');
    eventHandler.subscribe<(text: string, other: string, obj: { text: string }) => void>('changeText', (text, other, obj) => {
        console.log("text:", text, ",other:", other, ",obj:", obj);
        setText(text);
    });
    return <div>{text}</div>
}

export default createPlugin(
    'header-content',
    'test',
    Test
)