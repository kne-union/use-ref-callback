
# use-ref-callback


### 安装

```shell
npm i --save @kne/use-ref-callback
```


### 概述

这是一个React hooks，它内部使用ref去保证callback是最新的（你也可以通过参数指定callback为初始值），而不引起组件的不必要渲染

你为何需要使用它？

在我们使用React hooks进行函数式组件开发的时候，经常遇到一个棘手的问题，组件的事件绑定函数的更新问题例如：

```jsx
const Example = () => {
  const handlerClick = () => {
  };
  return <Button onClick={handlerClick}>按钮</Button>
};
```

在以上代码中，每次Example组件render，handlerClick都会重新生成，则组件Button的onClick属性就会随之更新，进而触发组件Button的render，但是这其实是不必要的。

所以我们通常会改造代码如下:

```jsx
import { useCallback } from 'react';

const Example = () => {
  const handlerClick = useCallback(() => {
  }, []);
  return <Button onClick={handlerClick}>按钮</Button>
};
```

但是以上改造中又会带来新的问题，如果在handlerClick中需要执行一个传给Example的属性的函数，那么我们需要把它放到useCallback的dependence里面

```jsx
import { useCallback } from 'react';

const Example = ({ callback }) => {
  const handlerClick = useCallback(() => {
  }, [callback]);
  return <Button onClick={handlerClick}>按钮</Button>
};
```

如果调用的地方的callback没有使用useCallback去限制不必要的render导致的修改，那么handlerClick每次依然会被修改成新的值从而触发Button的不必要render，如果我们不把它放到useCallback的dependence里面，那callback
里面如果引用了可能会修改的state或者props，由于我们一直使用的是老的callback值，导致callback中的值也是老的，就带来了程序错误。

这个hooks就解决了这个问题，它使用ref去记录每次callback修改的值，确保你调用的函数是最新的函数。但是它本身是用useCallback包裹过的，不会引起组件render。


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _useRefCallback(@kne/use-ref-callback),button(antd/lib/button),space(antd/lib/space),_Switch(antd/lib/switch),_message(antd/lib/message)

```jsx
const { default: useRefCallback } = _useRefCallback;
const { useState } = React;
const { default: Button } = button;
const { default: Space } = space;
const { default: Switch } = _Switch;
const { default: message } = _message;

const BaseExample = ({ callback }) => {
  const [keepInit, setKeepInit] = useState(false);
  const handlerClick = useRefCallback(callback, keepInit);
  return <Space>
    <Switch checked={keepInit} onChange={setKeepInit} /><Button type="primary" onClick={handlerClick}>点击执行callback</Button>
  </Space>;
};

const Example = () => {
  const [count, setCount] = useState(0);
  return <Space direction="vertical">
    <div><BaseExample callback={() => {
      message.info(count);
    }} /></div>
    <div>
      <Button onClick={() => {
        setCount((value) => value + 1);
      }}>状态+1，当前状态:{count}
      </Button>
    </div>
  </Space>;
};

render(<Example />);

```


### API

### useRefCallback(callback,keepInit)

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|callback|回调函数|function|-|
|keepInit|如果为true，callback更新时返回function将不重新赋值|boolean|false|

返回值: function
包装后的方法，将会通过ref自动赋值为最新的callback

