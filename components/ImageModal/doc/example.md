## 图片预览模态框


|input|function|require|
|---|---|---|
|visible|是否显示模态框|required|
|src|当前图片src|required|
|imgPool|图片列表|optional|
|onClose|关闭模态框函数|required|


```
<ImageModal visible={this.props.imgModal.visible}
            src={this.props.imgModal.src}
            imgPool={[...this.props.imgModal.imgPool].reverse()}
            onClose={() => {
                this.props.dispatch({type: 'ChatRoomPage/toggleImgModal'})
             }}/>
```
