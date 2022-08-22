import { IPlugin, PluggableManager } from "../typings";

class PluggableCoreManager implements PluggableManager {

    public plugins = new Map<string, IPlugin>();

    has = (name: string, alias?: string) => {
        const key = this.getKey(name, alias);
        return this.plugins.has(key);
    }

    get = (name: string, alias?: string) => {
        const key = this.getKey(name, alias);
        if (!this.has(name, alias))
            throw new Error(`插件"${key}"未被注册.`);
        return this.plugins.get(key);
    }

    getKey = (name: string, alias?: string) => {
        return `${name}${alias ? `/${alias}` : ''}`;
    }

    getPlugins = (name: string, alias?: string) => {
        const plugins = Array.from(this.plugins.values());
        const key = this.getKey(name, alias);
        return plugins.filter(plugin => alias ? `${plugin.name}${plugin.alias ? `/${plugin.alias}` : ''}` === key : plugin.name === name);
    }

    removePlugin = (name: string, alias?: string) => {
        const key = this.getKey(name, alias);
        if (!this.has(name, alias))
            throw new Error(`插件"${key}"未被注册.`);
        return this.plugins.delete(key);
    }

    registerPlugin = (plugin: IPlugin) => {
        const key = this.getKey(plugin.name, plugin.alias);
        if (this.has(plugin.name, plugin.alias))
            throw new Error(`插件"${key}"已注册.`);
        this.plugins.set(key, plugin);
        return key;
    }

    registerPlugins = (plugins: IPlugin[]) => {
        return plugins.map(plugin => this.registerPlugin(plugin));
    }
}

export default PluggableCoreManager