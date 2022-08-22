import React from 'react';
import { PluggableProvider, Slot } from '../src';
import { plugins } from './plugins';

const App: React.FC = () => {

  return (
    <PluggableProvider plugins={plugins}>
      <Slot name="header" />
      <Slot name="main" />
      <Slot name="footer" />
    </PluggableProvider>
  )
}

export default App
