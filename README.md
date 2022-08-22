# react-pluggable-vx

> React Slot 组件。

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

插件组件其实和普通 React 组件无异，在需要事件通信时可能需要使用到`PluginProvided`.

header.tsx

```typescript
import React from "react";
import { PluginProvided, Slot } from "react-pluggable-vx";

const Header: React.FC<PluginProvided> = ({ eventHandler }) => {
  const handleClick = () => {
    eventHandler.send("changeText", "你好呀", "heihei");
  };

  return (
    <div onClick={handleClick}>
      <h3>Header Component</h3>
      <Slot name="header-content" />
    </div>
  );
};

export default Header;
```

headerContent.tsx

```typescript
import React, { useState } from "react";
import { PluginProvided } from "react-pluggable-vx";

const HeaderContent: React.FC<PluginProvided> = ({ eventHandler }) => {
  const [text, setText] = useState("Test Plugin");
  eventHandler.subscribe<
    (text: string, other: string, obj: { text: string }) => void
  >("changeText", (text, other, obj) => {
    console.log("text:", text, ",other:", other, ",obj:", obj);
    setText(text);
  });
  return <div>{text}</div>;
};

export default HeaderContent;
```

**编写配置文件**

config.ts

```typescript
import { defineConfig } from "react-pluggable-vx";

export default defineConfig({
  // 导入想要目录内所有*.tsx插件
  modules: import.meta.glob("./pluggable/**/*.tsx"),
  plugins: [
    {
      name: "header",
      alias: "01",
      component: "./pluggable/Header/header",
    },
    {
      name: "header-content",
      component: "./pluggable/test",
    },
  ],
});
```

App.tsx

```typescript
import React from "react";
import { PluggableProvider, Slot } from "react-pluggable-vx";
import config from "./config";

const App: React.FC = () => {
  return (
    <PluggableProvider config={config}>
      <Slot name="header" />
      <Slot name="main" />
      <Slot name="footer" />
    </PluggableProvider>
  );
};

export default App;
```

## 组件与 API

##### Slot 组件

| 属性 | 是否必传 | 说明      |
| ---- | -------- | --------- |
| name | 是       | slot 名称 |

##### PluggableProvider 组件

| 属性    | 是否必传 | 说明                                           |
| ------- | -------- | ---------------------------------------------- |
| config  | 否       | 配置文件                                       |
| plugins | 否       | 除了配置文件导入，还能使用这个属性进行导入插件 |

##### defineConfig 配置文件说明

| 属性    | 是否必传 | 说明                                          |
| ------- | -------- | --------------------------------------------- |
| modules | 否       | 使用`import.meta.glob()`方法导入的所有 module |
| plugins | 否       | 是一个插件配置项                              |

##### PluggableConfigItem 接口

| 属性      | 是否必传 | 说明                             |
| --------- | -------- | -------------------------------- |
| name      | 是       | `slot`名称，根据此名称，插入组件 |
| alias     | 否       | 插件别名                         |
| component | 是       | `.tsx`文件名                     |

##### PluginProvided 接口

| 属性         | 说明                   |
| ------------ | ---------------------- |
| pluginKey    | 插入组件时生成的 key   |
| index        | 处于 Slot 中的下标位置 |
| eventHandler | 事件管理器             |

##### EventHandler

**`send`方法**

组件发送消息到指定订阅事件

```typescript
send: (eventType: string, ...args: any[]) => void;
```

**`subscribe`方法**

在组件内订阅事件

```typescript
subscribe: <T extends Function>(eventType: string, listener: T) => void;
```

**`subscribeOnce`方法**

在组件内订阅一次性事件

```typescript
subscribeOnce: <T extends Function>(eventType: string, listener: T) => void;
```

**`removeAll`方法**

移除所有事件

```typescript
removeAll: (eventType?: string) => void;
```

## License

MIT © [AnizGu](https://raw.githubusercontent.com/AnizGu/react-pluggable-vx/main/LICENSE)
