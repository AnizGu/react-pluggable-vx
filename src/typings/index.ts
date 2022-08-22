import { PropsWithChildren } from "react";


export type PluginRenderComponent = React.ComponentType<PluginProvided>;
export type PluggableChildren = React.ReactNode | ((register: PluggableRegister) => JSX.Element) | undefined;

export interface PluggableProviderProps extends PropsWithChildren {
    config?: PluggableConfig;
    plugins?: IPlugin[];
};

export interface PluggableContextValue {
    manager: PluggableManager;
    eventHandler: EventHandler;
}

export interface PluggableRegister {
    registerPlugin: React.Dispatch<React.SetStateAction<IPlugin | undefined>>;
    registerPlugins: React.Dispatch<React.SetStateAction<IPlugin[]>>;
}

export interface Manager {
    has: (name: string, alias?: string) => boolean;
    get: (name: string, alias?: string) => IPlugin | undefined;
    getKey: (name: string, alias?: string) => string;
    getPlugins: (name: string, alias?: string) => IPlugin[];
    removePlugin: (name: string, alias?: string) => boolean;
    registerPlugin: (plugin: IPlugin) => string;
    registerPlugins: (plugins: IPlugin[]) => string[];
}

export interface EventHandler {
    send: (eventType: string, ...args: any[]) => void;
    subscribe: <T extends Function>(eventType: string, listener: T) => void;
    subscribeOnce: <T extends Function>(eventType: string, listener: T) => void;
    removeAll: (eventType?: string) => void;
}

export interface PluggableManager extends Manager {
    plugins: Map<string, IPlugin>;
}

export interface PluginProvided {
    pluginKey: string;
    index: number;
    eventHandler: EventHandler
}

export interface IPlugin {
    name: string;
    alias?: string;
    Component: PluginRenderComponent;
}

export interface SlotProps {
    name: string;
}

export interface PluggableProps extends PropsWithChildren {
    plugins?: IPlugin[];
}

export interface PluggableConfigItem {
    name: string;
    alias?: string;
    component: string;
}

export interface PluggableConfig {
    modules?: any,
    plugins?: PluggableConfigItem[]
}