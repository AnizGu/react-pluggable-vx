import { defineConfig } from "../src";

export default defineConfig({
    modules: import.meta.glob('./pluggable/*.tsx'),
    plugins: [
        {
            name: 'header',
            alias: '01',
            component: 'header'
        },
        {
            name: 'header-content',
            component: "test"
        }
    ]
})