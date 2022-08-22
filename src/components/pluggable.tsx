import React, { isValidElement, useEffect, useState } from 'react';
import { useManager } from '../hooks';
import { PluggableProps } from '../typings';
import Slot from './slot';

const Pluggable: React.FC<PluggableProps> = ({ plugins, children }) => {

    const manager = useManager();
    const [keys, setKeys] = useState<string[]>([]);

    useEffect(() => {
        if (plugins) {
            const keys = manager.registerPlugins(plugins);
            setKeys(keys);
        }
    }, [plugins]);

    return (
        <>
            {React.Children.map(children, (child) => {
                if (!isValidElement(child))
                    return;
                if (child.type === Slot && keys)
                    return React.cloneElement(child, child.props)
            })}
        </>
    )
}

export default Pluggable;