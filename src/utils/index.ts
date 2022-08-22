import { lazy } from "react";
import { PluggableConfig } from "../typings";

export const defineConfig = (config: PluggableConfig) => {
    return config;
}

export const loadPlugins = (config?: PluggableConfig) => (config && config.plugins) ? config.plugins.map(plugin => {
    const { name, alias, component } = plugin;
    const Component = lazy(config.modules[`./pluggable/${component}.tsx`])
    return {
        name,
        alias,
        Component
    }
}) : [];