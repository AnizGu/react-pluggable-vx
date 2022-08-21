import React from "react";
import { Provider } from "react-redux";
import { store } from '../redux/store';
import { PluggableProviderProps } from "../typings";
import Pluggable from "./manager";

const PluggableProvider: React.FC<PluggableProviderProps> = ({ plugins, children }) => (
    <Provider store={store}>
        <Pluggable plugins={plugins}>{children}</Pluggable>
    </Provider>
)

export default PluggableProvider;
