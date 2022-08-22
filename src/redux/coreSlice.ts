import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PluggableCoreManager from '../plugin';
import PluggableEventHandler from '../event';
import { IPlugin, PluggableState } from '../typings';

const manager = new PluggableCoreManager();
const eventHandler = new PluggableEventHandler();

const initialState: PluggableState = {
    manager,
    eventHandler
}

export const coreSlice = createSlice({
    name: 'pluggableCore',
    initialState,
    reducers: {
        registerPlugins: (state, action: PayloadAction<IPlugin[]>) => {
            const { payload } = action;
            state.manager.registerPlugins(payload);
        }
    },
});

export const { registerPlugins } = coreSlice.actions
export default coreSlice.reducer