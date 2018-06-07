
exmplate:

```js
{
    var _list = []
    _list.push({
        title: '晓说 2017',
        url: 'http://www.baidu.com'
    })
    _list.push({
        title: '小朋友听三国演义小朋友听三国演义小朋友听三国演义小朋友听三国演义小朋友听三国演义小朋友听三国演义',
        url: 'http://www.baidu.com'
    })
    _list.push({
        title: '晓说 2017',
        url: 'http://www.baidu.com'
    })
    _list.push({
        title: '小朋友听三国演义',
        url: 'http://www.baidu.com'
    })
}
<div style={{background: '#eee',padding: '5px'}}>
<Card bordered style={{width: 300}} 
  titleName="热门头条" titleLink="http://www.baidu.com" titleIconColor="rgb(253,84,90)" titleIconClass="web_ic_hot" list={_list}>
</Card>
<br/>
<Card style={{width: 300}} 
  titleName="时尚生活" titleLink="http://www.baidu.com" titleIconColor="rgb(116,75,138)" titleIconClass="web_ic_fashion">
  <p>自定义列表1</p>
  <p>自定义列表2</p>
  <p>自定义列表3</p>
</Card>
</div>
```