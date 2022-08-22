import { defineConfig } from "../src";

export default defineConfig({
    modules: import.meta.glob('./pluggable/**/*.tsx'),
    plugins: [
        {
            name: 'header',
            alias: '01',
            component: './pluggable/Header/header'
        },
        {
            name: 'header-content',
            component: "./pluggable/test"
        },
        {
            name: 'main',
            component: './pluggable/Main/index'
        },
        {
            name: 'main-content',
            component: './pluggable/Main/MainContent/index'
        }
    ]
})