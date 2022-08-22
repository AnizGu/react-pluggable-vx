import React, { useEffect, useState } from 'react';
import { useManager, useEventHandler } from '../hooks';
import { IPlugin, SlotProps } from '../typings';

const Slot: React.FC<SlotProps> = ({ name }) => {

    const manager = useManager();
    const eventHandler = useEventHandler();

    const [plugins, setPlugins] = useState<IPlugin[]>([]);

    useEffect(() => {
        setPlugins(manager.getPlugins(name));
    }, [manager.plugins.size]);

    return (
        <>
            {plugins.map((plugin, index) => {
                const { name, alias, Component } = plugin;
                const key = manager.getKey(name, alias);
                return (
                    <Component
                        key={key}
                        eventHandler={eventHandler}
                        pluginKey={key}
                        index={index} />
                )
            })}
        </>
    )
}

export default Slot;