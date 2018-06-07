---
category: Components
type: General
title: Button
subtitle: 按钮
---

## 按钮

## API

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `size` 

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 设置按钮的图标类型 | string | - |
| size | 设置按钮大小，可选值为 `small` `large` 或者不设 | string | `default` |
| type | 设置按钮类型，可选值为 `primary` | string | - |
| onClick | `click` 事件的 handler | function | - |

```
<Button icon='web_album_ic_phone'>按钮</Button>
<Button type='primary' size='small'>按钮</Button>
```
