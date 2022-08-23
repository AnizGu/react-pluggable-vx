import React, { isValidElement, useEffect } from 'react';
import { useRegister } from '../hooks';
import { PluggableProps } from '../typings';
import Slot from './slot';

const Pluggable: React.FC<PluggableProps> = ({ plugins, children }) => {

    const [, register] = useRegister();
    useEffect(() => {
        if (plugins)
            register.registerPlugins(plugins);
    }, [plugins]);

    return (
        <>
            {React.Children.map(children, (child) => {
                if (!isValidElement(child))
                    return child;
                if (child.type === Slot)
                    return React.cloneElement(child, { ...child.props })
                return child;
            })}
        </>
    )
}

export default Pluggable;