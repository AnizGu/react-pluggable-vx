declare global {
    interface ImportMeta {
        glob: (path: string) => any;
    }
}

export { }