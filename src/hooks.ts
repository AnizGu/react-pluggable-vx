import { useContext } from "react";
import { PluggableContext } from "./components/context";

export const useManager = () => useContext(PluggableContext).manager;
export const useEventHandler = () => useContext(PluggableContext).eventHandler;