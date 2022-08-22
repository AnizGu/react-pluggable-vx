import React, { useEffect, useState } from "react";
import { IPlugin, PluggableProviderProps } from "../typings";
import { loadPlugins } from "../utils";
import { PluggableContext, defaultContextValue } from "./context";
import Pluggable from "./pluggable";
import.meta.url
const PluggableProvider: React.FC<PluggableProviderProps> = ({ config, plugins = [], children }) => {

    const [configPlugins, setPlugins] = useState<IPlugin[]>([]);

    useEffect(() => {
        setPlugins([...loadPlugins(config), ...plugins]);
    }, [])

    return (
        <PluggableContext.Provider value={defaultContextValue}>
            <Pluggable plugins={configPlugins}>{children}</Pluggable>
        </PluggableContext.Provider>
    )
}

export default PluggableProvider;
