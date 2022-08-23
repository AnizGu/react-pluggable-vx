import { useContext, useEffect, useState } from "react";
import { PluggableContext } from "./components/context";
import { IPlugin, PluggableRegister } from "./typings";

export const useManager = () => useContext(PluggableContext).manager;
export const useEventHandler = () => useContext(PluggableContext).eventHandler;
export const useRegister = (): [string[], PluggableRegister] => {
    const manager = useManager();
    const [keys, setKeys] = useState<string[]>([]);
    const [plugin, registerPlugin] = useState<IPlugin>();
    const [plugins, registerPlugins] = useState<IPlugin[]>([]);

    useEffect(() => {
        if (plugin) {
            const key = manager.registerPlugin(plugin);
            setKeys([...keys, key]);
        }
    }, [plugin]);

    useEffect(() => {
        if (plugins) {
            const keys = manager.registerPlugins(plugins);
            setKeys(keys);
        }
    }, [plugins]);

    return [keys, { registerPlugin, registerPlugins }]
}