### useRefCallback(callback,keepInit)

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|callback|回调函数|function|-|
|keepInit|如果为true，callback更新时返回function将不重新赋值|boolean|false|

返回值: function
包装后的方法，将会通过ref自动赋值为最新的callback
