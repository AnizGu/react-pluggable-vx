# react-pluggable-vx

> React Slot组件。

[![NPM](https://img.shields.io/npm/v/react-pluggable-vx.svg)](https://www.npmjs.com/package/react-pluggable-vx) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 安装

```bash
npm install --save react-pluggable-vx
```

**or**

```bash
yarn add react-pluggable-vx
```

## 使用

**编写插件**

header.tsx

```typescript
import React, { useState } from 'react';
import { createPlugin } from "react-pluggable-vx";
import type { PluginProvided } from 'react-pluggable-vx';

const Header: React.FC<PluginProvided> = ({eventHandler }) => {
    const [text, setText] = useState('Test Plugin');
    eventHandler.subscribe<(text: string, other: string, obj: { text: string }) => void>('changeText', (text, other, obj) => {
        console.log("text:", text, ",other:", other, ",obj:", obj);
        setText(text);
    });
    return <div>{text}</div>
}

export default createPlugin(
    'header',
    'test',
    Header
)
```

**编写插件集合**

plugin.tsx

```typescript
import React, { useState } from 'react';
import HeaderPlugin from './header';

export const plugins = [
    HeaderPlugin
]
```

App.tsx

```typescript
import React from 'react';
import { PluggableProvider, Slot } from 'react-pluggable-vx';
import { plugins } from './plugins';

const App: React.FC = () => {

  return (
    // 在plugins属性，传入您的所有插件
    <PluggableProvider plugins={plugins}>
      <Slot name="header" />
      <Slot name="main" />
      <Slot name="footer" />
    </PluggableProvider>
  )
}

export default App
```

## License

MIT © [AnizGu](https://raw.githubusercontent.com/AnizGu/react-pluggable-vx/main/LICENSE)