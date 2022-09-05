import * as component_36 from '@kne/use-ref-callback';
import * as component_37 from 'antd/lib/button';
import * as component_38 from 'antd/lib/space';
import * as component_39 from 'antd/lib/switch';
import * as component_40 from 'antd/lib/message';
const readmeConfig = {
    name: `@kne/use-ref-callback`,
    description: `这是一个React hooks，它内部使用ref去保证callback是最新的（你也可以通过参数指定callback为初始值），而不引起组件的不必要渲染`,
    summary: `<p>这是一个React hooks，它内部使用ref去保证callback是最新的（你也可以通过参数指定callback为初始值），而不引起组件的不必要渲染</p>
<p>你为何需要使用它？</p>
<p>在我们使用React hooks进行函数式组件开发的时候，经常遇到一个棘手的问题，组件的事件绑定函数的更新问题例如：</p>
<pre><code class="language-jsx">const Example = () =&gt; {
  const handlerClick = () =&gt; {
  };
  return &lt;Button onClick={handlerClick}&gt;按钮&lt;/Button&gt;
};
</code></pre>
<p>在以上代码中，每次Example组件render，handlerClick都会重新生成，则组件Button的onClick属性就会随之更新，进而触发组件Button的render，但是这其实是不必要的。</p>
<p>所以我们通常会改造代码如下:</p>
<pre><code class="language-jsx">import { useCallback } from 'react';

const Example = () =&gt; {
  const handlerClick = useCallback(() =&gt; {
  }, []);
  return &lt;Button onClick={handlerClick}&gt;按钮&lt;/Button&gt;
};
</code></pre>
<p>但是以上改造中又会带来新的问题，如果在handlerClick中需要执行一个传给Example的属性的函数，那么我们需要把它放到useCallback的dependence里面</p>
<pre><code class="language-jsx">import { useCallback } from 'react';

const Example = ({ callback }) =&gt; {
  const handlerClick = useCallback(() =&gt; {
  }, [callback]);
  return &lt;Button onClick={handlerClick}&gt;按钮&lt;/Button&gt;
};
</code></pre>
<p>如果调用的地方的callback没有使用useCallback去限制不必要的render导致的修改，那么handlerClick每次依然会被修改成新的值从而触发Button的不必要render，如果我们不把它放到useCallback的dependence里面，那callback
里面如果引用了可能会修改的state或者props，由于我们一直使用的是老的callback值，导致callback中的值也是老的，就带来了程序错误。</p>
<p>这个hooks就解决了这个问题，它使用ref去记录每次callback修改的值，确保你调用的函数是最新的函数。但是它本身是用useCallback包裹过的，不会引起组件render。</p>`,
    api: `<h3>useRefCallback(callback,keepInit)</h3>
<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>callback</td>
<td>回调函数</td>
<td>function</td>
<td>-</td>
</tr>
<tr>
<td>keepInit</td>
<td>如果为true，callback更新时返回function将不重新赋值</td>
<td>boolean</td>
<td>false</td>
</tr>
</tbody>
</table>
<p>返回值: function
包装后的方法，将会通过ref自动赋值为最新的callback</p>`,
    example: {
        isFull: false,
        className: `use_ref_callback_72ea4`,
        style: ``,
        list: [{
    title: `这里填写示例标题`,
    description: `这里填写示例说明`,
    code: `const { default: useRefCallback } = _useRefCallback;
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

`,
    scope: [{
    name: "_useRefCallback",
    packageName: "@kne/use-ref-callback",
    component: component_36
},{
    name: "button",
    packageName: "antd/lib/button",
    component: component_37
},{
    name: "space",
    packageName: "antd/lib/space",
    component: component_38
},{
    name: "_Switch",
    packageName: "antd/lib/switch",
    component: component_39
},{
    name: "_message",
    packageName: "antd/lib/message",
    component: component_40
}]
},{
    title: `这里填写示例标题`,
    description: `这里填写示例说明`,
    code: `const { default: useRefCallback } = _useRefCallback;
const { useState } = React;
const { default: Button } = button;
const { default: Space } = space;
const { default: Switch } = _Switch;
const { default: message } = _message;

const Example = () => {
  const [count, setCount] = useState(0);
  const showCount = useRefCallback(() => {
    message.info(count);
  });
  return <Space direction="vertical">
    <div>{count}</div>
    <Space>
      <Button onClick={() => {
        setCount((count) => count + 1);
      }}>修改</Button>
      <Button type="primary" onClick={showCount}>显示</Button>
    </Space>
  </Space>;
};

render(<Example />);

`,
    scope: [{
    name: "_useRefCallback",
    packageName: "@kne/use-ref-callback",
    component: component_36
},{
    name: "button",
    packageName: "antd/lib/button",
    component: component_37
},{
    name: "space",
    packageName: "antd/lib/space",
    component: component_38
},{
    name: "_Switch",
    packageName: "antd/lib/switch",
    component: component_39
},{
    name: "_message",
    packageName: "antd/lib/message",
    component: component_40
}]
}]
    }
};
export default readmeConfig;
