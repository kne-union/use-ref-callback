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
