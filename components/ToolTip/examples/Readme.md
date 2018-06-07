```js
<div>
  <ToolTip placement="top" title="提示的文字">
    <a herf="javascript:;" style={{marginRight: 30}}>Top</a>
  </ToolTip>

  <ToolTip placement="right" title={<span>提示的内容</span>}>
    {/*child node accepts onMouseEnter, onMouseLeave, onFocus, onClick event.*/}
    <span>
      <VIcon num="0" type="orange"></VIcon>
    </span>
  </ToolTip>
</div>
```