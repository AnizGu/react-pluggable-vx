import React from 'react';
import { PluggableProvider, Slot } from '../src';
import config from './config';

const App: React.FC = () => {
  return (
    <PluggableProvider config={config}>
      <Slot name="header" />
      <Slot name="main" />
      <Slot name="footer" />
    </PluggableProvider>
  )
}

export default App
