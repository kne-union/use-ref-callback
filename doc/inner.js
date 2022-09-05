const { default: useRefCallback } = _useRefCallback;
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
