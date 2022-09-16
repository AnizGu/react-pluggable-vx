import React, { useEffect, useState } from 'react';
import { PluggableProvider, Slot, useEventHandler, useRegister } from '../src';
import config from './config';

const App: React.FC = () => {

  const [, register] = useRegister();

  const dynamicImport = async ()=> {
    const path = './pluggable/test.tsx';
    const module = await import(/*webpackIgnore: true*/ path);
    console.log('module', module);
  }

  dynamicImport();

  useEffect(() => {
    register.registerPlugins([
      {
        name: 'header',
        alias: '01',
        Component: () => {
          const event = useEventHandler();
          return <div className='header'><button onClick={()=> {event.send('change',"呵呵")}}>点我</button><Slot name="header-content" /></div>
        }
      },
      {
        name: 'main',
        Component: () => <div>Main</div>
      },
      {
        name: 'footer',
        Component: () => <div>Footer</div>
      }
    ]);
    
  }, []);

  function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  const handleClick = () => {
    const count = random(0, 100);
    register.registerPlugin({
      name: 'header',
      alias: count.toString(),
      Component: () => {
        const [t, setText] = useState(count.toString());
        const event = useEventHandler();
        event.subscribe<(text: string) => void>('change', (text) => {
          setText(text);
        })
        return <div>{t}</div>
      }
    })
  }

  return (
    <PluggableProvider>
      <button onClick={handleClick}>导入插件</button>
      <Slot name="header" />
      <Slot name="main" />
      <Slot name="footer" />
    </PluggableProvider>
  )
}

export default App
