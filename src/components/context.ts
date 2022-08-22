import React from "react";
import PluggableEventHandler from "../event";
import PluggableCoreManager from "../manager";
import { PluggableContextValue } from "../typings";

const manager = new PluggableCoreManager();
const eventHandler = new PluggableEventHandler();

export const defaultContextValue: PluggableContextValue = {
    manager,
    eventHandler
}

export const PluggableContext = React.createContext<PluggableContextValue>(defaultContextValue)