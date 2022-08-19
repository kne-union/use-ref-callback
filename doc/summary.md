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
