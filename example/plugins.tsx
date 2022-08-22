import React, { useState } from 'react';
import { createPlugin, Slot } from '../src';
import TestPlugin from './test';

export const plugins = [
    createPlugin('header', '01', ({ eventHandler, pluginKey }) => {
        return (
            <div className={pluginKey}>
                <div onClick={() => {
                    eventHandler.send('changeText', 'Test Content Message received', 'heihei', { text: 'hello' })
                }}>Header Component</div>
                <Slot name="header-content" />
            </div>
        )
    }),
    TestPlugin,
    createPlugin('main', '01', ({ pluginKey }) => <div className={pluginKey}>Main Component</div>),
    createPlugin('footer', '01', ({ pluginKey }) => <div className={pluginKey}>Footer Component</div>)
]