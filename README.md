# react-pluggable-vx

> React Slot 组件。

[![NPM](https://img.shields.io/npm/v/@gulibs/react-pluggable-vx.svg)](https://www.npmjs.com/package/react-pluggable-vx) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 安装

```bash
npm install --save @gulibs/react-pluggable-vx
```

**or**

```bash
yarn add @gulibs/react-pluggable-vx
```

## 使用

**编写需要放入插槽的组件**

组件其实和普通 React 组件无异，在需要事件通信时可能需要使用到`PluginProvided`.

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

**配置文件 ts**

它可以帮助你导入所有的组件，须指定文件夹和需要导入的文件相对路径。

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

**编写插槽**

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

## Hooks

#### useManager()

管理插件组件

**使用**

```typescript
const manager = useManager();
```

**示例**

```typescript
import React, { useEffect } from "react";
import { useManager } from "react-pluggable-vx";

const TestUseManager: React.FC = () => {
  const manager = useManager();

  useEffect(() => {
    // 还有许多api可以自行使用查看
    // 注册插件
    manager.registerPlugin({});
    // 注册多个插件
    manager.registerPlugins([
      // ... do something
    ]);
  }, []);
  return (
    <div>
      <Slot name="test" />
    </div>
  );
};
```

#### useEventHandler()

事件管理器

**使用**

```typescript
const event = useEventHandler();
```

**示例**

```typescript
import React, { useEffect } from "react";
import { useEventHandler } from "react-pluggable-vx";

// 插入到Slot receive的组件
const Receive: React.FC = () => {
  const event = useEventHandler();
  const [text, setText] = useState("");

  event.subscribe<(text: string) => void>("changeText", (text) => {
    setText(text);
  });

  return <div>{text}</div>;
};

// 容器组件或者其他Slot中的组件
const TestUseEventHandler: React.FC = () => {
  const event = useEventHandler();

  const handleClick = () => {
    // 发送消息
    event.send("changeText", "Hello World");
  };

  return (
    <div>
      <button onClick={handleClick}>发送消息</button>
      <Slot name="receive" />
    </div>
  );
};
```

#### useRegister()

注册器，可以看做`useManager`的升级版，`useManager`可以作为查询插件组件的作用，注册插件组件时不具备重新渲染的能力，在注册插件时可能会出现不更新子组件的情况，所以如果我们要动态注册插件组件时，可以使用这个`hook api`做到动态注册组件.

**使用**

```typescript
const [keys, register] = useRegister();
```

**示例**

```typescript
import React, { useEffect } from "react";
import { useRegister } from "react-pluggable-vx";

const TestUseRegister: React.FC = () => {
  
  const [keys, register] = useRegister();

  useEffect(() => {
    // 调用以下函数后会动态注册组件，并返回已注册的组件的keys
    // 注册插件
    register.registerPlugin({});
    // 注册多个插件
    register.registerPlugins([
      // ... do something
    ]);
  }, []);
  return (
    <div>
      <Slot name="test" />
    </div>
  );
};
```

## API

##### Slot 插槽组件

用于读取需要放入插槽的组件并渲染

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

| 属性      | 是否必传 | 说明                                                                                      |
| --------- | -------- | ----------------------------------------------------------------------------------------- |
| name      | 是       | `slot`名称，根据此名称插入组件,如果需要在插槽内插入多个子组件需要使用`name/alias`形式插入 |
| alias     | 否       | 插件别名，不提供，则作为主组件插入                                                        |
| component | 是       | `.tsx`文件名                                                                              |

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
