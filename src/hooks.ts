import { useAppSelector } from "./redux/hooks"

export const useManager = () => useAppSelector(state => state.pluggableCore.manager);
export const useEventHandler = ()=> useAppSelector(state => state.pluggableCore.eventHandler);