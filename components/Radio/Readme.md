## Radio 单选框

在一组备选项中进行单选

### 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

:::demo 要使用 Radio 组件，需要设置`value`绑定变量，可以通过`checked`来指定Radio的选中状态。

```js
constructor(props) {
  super(props);
  this.state = {
    value: 1
  }
}
onChange(value) {
  this.setState({ value });
}
render() {
  return (
    <div>
      <Radio value="1" checked={this.state.value === 1} onChange={this.onChange.bind(this)}>备选项</Radio>
      <Radio value="2" checked={this.state.value === 2} onChange={this.onChange.bind(this)}>备选项</Radio>
    </div>
  )
}
```

### 禁用状态

单选框不可用的状态。

:::demo 注意：请牢记，选中的条件是绑定的变量值等于`value`中的值。只要在`Radio`元素中设置`disabled`属性即可，它接受一个`Boolean`，`true`为禁用。

```js
render() {
  return (
    <div>
      <Radio value="1" disabled={true}>备选项</Radio>
      <Radio value="2" disabled={true}>备选项</Radio>
    </div>
  )
}
```

### 单选框组

适用于在多个互斥的选项中选择的场景

:::demo 结合`Radio.Group`元素和子元素`Radio`可以实现单选组，在`Radio.Group`中绑定`value`，在`Radio`中设置好`value`即可，无需再给每一个`Radio`绑定变量，另外，还提供了`onChange`事件来响应变化，它会传入一个参数`value`。

```js
constructor(props) {
  super(props);
  this.state = {
    value: 3
  }
}
onChange(value) {
  this.setState({ value });
}
render() {
  return (
    <Radio.Group value={this.state.value} onChange={this.onChange.bind(this)}>
      <Radio value="3">备选项</Radio>
      <Radio value="6">备选项</Radio>
      <Radio value="9">备选项</Radio>
    </Radio.Group>
  )
}
```
### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| checked     | Radio是否被选中   | boolean    |       —        |      false   |
| value     | Radio 的 value   | string,number,boolean    |       —        |      —   |
| disabled  | 是否禁用    | boolean   | — | false   |

### Radio-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | Radio 的 value   | string,number,boolean    |       —        |      —   |

### Radio-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |
