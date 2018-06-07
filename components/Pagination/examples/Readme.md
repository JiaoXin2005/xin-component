Pagination
-------------

![example](./example.png)

#### Attributes

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
curPage | 当前页码 | Number | - | 1
midPartLength | 中间显示的页数长度 | Number | - | 5
total | 总数 |  Number | - | -
pageSize | 单页显示数 | Number | - | -
totalPage | 总页数 | Number | - | -
totalPageLimit | 限制最大页数 | Number | - | -
onPageChange | 当前页面改变后执行函数 默认传入参数当前页码 | Function | -

> totalPage 有优先使用 totalPage 忽略 total, pageSize;
否则，使用 total, pageSize;
否则，报错;

```jsx

<Pagination />

<Pagination total={100} pageSize={5} midPartLength={5} onPageChange={(v)=>{console.log('hhe', v)}} />

```

### 重构计划
1. 应对服务端渲染的需求，改成 Link 来跳转页面
2. 用隐藏的方式来做页面分页，避免大幅度跳动
