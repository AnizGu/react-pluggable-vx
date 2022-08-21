import React, { useLayoutEffect } from 'react';
import { useManager } from '../hooks';
import { registerPlugins } from '../redux/coreSlice';
import { useAppDispatch } from '../redux/hooks';
import { PluggableProps } from '../typings';

const Pluggable: React.FC<PluggableProps> = ({ plugins, children }) => {
    const dispatch = useAppDispatch();
    const manager = useManager();
    useLayoutEffect(() => {
        if (plugins)
            dispatch(registerPlugins(plugins));
    }, []);

    return (
        <>
            {typeof children === 'function' ? children(manager) : children}
        </>
    )
}

export default Pluggable;