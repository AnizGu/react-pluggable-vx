import { IPlugin, PluginRenderComponent } from "../typings";

export const createPlugin = (name: string, alias: string, Component: PluginRenderComponent): IPlugin => {
    return {
        name,
        alias,
        Component
    };
}