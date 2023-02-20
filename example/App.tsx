import React, { useEffect, useState } from 'react';
import { PluggableProvider, Slot, useEventHandler, useRegister } from '../src';
import { v1 } from 'uuid';

const App: React.FC = () => {

  const [, register] = useRegister();

  useEffect(() => {
    register.registerPlugins([
      {
        name: 'header',
        alias: '01',
        Component: () => {
          const event = useEventHandler();
          return (
            <div className='header'>
              <button onClick={() => { event.send('change', "呵呵") }}>点我</button>
              <Slot name="header-content" />
            </div>
          )
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

  const handleClick = () => {
    const pluginId = v1();
    register.registerPlugin({
      name: 'header',
      alias: pluginId,
      Component: () => {
        const [t, setText] = useState(pluginId);
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
