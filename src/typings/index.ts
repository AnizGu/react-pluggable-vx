
export type PluggableProviderProps = PluggableProps;
export type PluginRenderComponent = React.ComponentType<PluginProvided>;
export type PluggableChildren = React.ReactNode | ((register: PluggableRegister) => JSX.Element) | undefined;

export interface PluggableRegister {
    registerPlugin: (plugin: IPlugin) => string;
    registerPlugins: (plugins: IPlugin[]) => string[];
}

export interface PluggableMap {
    has: (name: string, alias?: string) => boolean;
    get: (name: string, alias?: string) => IPlugin | undefined;
    getKey: (name: string, alias?: string) => string;
    getPlugins: (name: string, alias?: string) => IPlugin[];
    removePlugin: (name: string, alias?: string) => boolean;
}

export interface EventHandler {
    send: (eventType: string, ...args: any[]) => void;
    subscribe: <T extends Function>(eventType: string, listener: T) => void;
    subscribeOnce: <T extends Function>(eventType: string, listener: T) => void;
    removeAll: (eventType?: string) => void;
}

export interface PluggableManager extends PluggableMap, PluggableRegister { }

export interface PluggableState {
    manager: PluggableManager;
    eventHandler: EventHandler;
}

export type PluginProvided = {
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

export interface PluggableProps {
    plugins?: IPlugin[];
    children?: PluggableChildren;
}