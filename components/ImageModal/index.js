import React from 'react';
import './style.scss';

const prefixCls = 'image-modal';


/** ImageModal
 * @description 图片预览
 * @function 放大/拖拽/切换
 * @param src 当前图片地址
 * @param imgPool: src[] 图片列表
 * @param visible 是否显示模态框
 * @todo  宽/高图识别逻辑应该通过input来制定，既模态框显示区域由props控制
 */
export default class ImageModal extends React.Component {
  currentIndex = 0;

  // 1长图 0宽图
  enlargeDirection = 1;

  // 鼠标点击时/拖动中的位置是否在图片上
  isMouseInImg = false;

  // 记录鼠标之前的位置，用于计算偏移量
  mousePreX = 0;
  mousePreY = 0;


  /*
    是否在阴影区域同时触发onmousedown和onmouserup
    避免在只在阴影区触发onmouserup而误判onclick事件
   */
  isShadowClick = false;

  // state初始化
  state = {
    currentImg: this.props.src,
    isEnlarged: false,
    imgXOffset: 0,
    imgYOffset: 0
  };


  componentWillReceiveProps(next) {
    if (!this.props.visible && next.visible) {
      this.setState({currentImg: next.src});
    }
  }


  componentDidMount() {
    const {imgPool = []} = this.props;
    if (imgPool.length > 0) {
      // 默认选中图片滚动条定位
      this.currentIndex = imgPool.indexOf(this.props.src);
      this.sliderScroll(this.currentIndex, imgPool.length);
    }
  }

  render() {
    const {visible, onClose, imgPool = []} = this.props;
    const {isEnlarged, imgXOffset, imgYOffset} = this.state;
    return visible ? (
      <div className={`${prefixCls}`}
           onMouseDown={() => {
             this.isShadowClick = true
           }}
           onMouseUp={() => {
             this.isShadowClick && onClose();
           }}>

        {/*显示区域*/}

        <div className={`${prefixCls}-content ${imgPool.length <= 0 ? 'image-modal-content-no-list' : ''}`}
             onMouseUp={(e) => {
               e.stopPropagation();
             }}
             onMouseDown={(e) => {
               e.stopPropagation();
             }}
             onClick={(e) => {
               e.stopPropagation();
             }}>

          {/*关闭图标*/}
          <div className={`${prefixCls}-close`}>
            <i onClick={onClose} className={`xuicon xuicon-cha gray-e8 pointer-orange`}/>
          </div>

          {/*放大/缩小按钮*/}
          <div onClick={this.toggleSize} className={`${prefixCls}-enlarge`}>
            {
              isEnlarged
                ? <i className={`xuicon xuicon-suoxiao pointer`}/>
                : <i className={`xuicon xuicon-fangda pointer`}/>
            }
          </div>

          {/*上一张*/}
          {imgPool.length > 0 &&
          <i className='operation-left-btn' onClick={() => {
            this.toggleImg(-1, 'offset')
          }}/>
          }

          {/*下一张*/}
          {imgPool.length > 0 &&
          <i className='operation-right-btn' onClick={() => {
            this.toggleImg(1, 'offset')
          }}/>
          }

          {/*图片显示区*/}
          <div className={`${prefixCls}-imgbox-scroll`}>

            <div className={`${prefixCls}-imgbox`}>
              <div
                className={`${prefixCls}-imgbox-inner ${isEnlarged ? 'image-modal-imgbox-enlarged' : ''}
                ${this.enlargeDirection === 0 ? 'image-modal-imgbox-width' : 'image-modal-imgbox-height'}`}>
                <img src={this.state.currentImg}
                     style={{
                       top: `${imgYOffset}px`,
                       left: `${imgXOffset}px`
                     }}
                     draggable={false}
                     onMouseDown={(e) => {
                       this.isMouseInImg = isEnlarged;
                       this.mousePreY = e.clientY;
                       this.mousePreX = e.clientX;
                     }}
                     onMouseUp={() => {
                       this.isMouseInImg = false;
                     }}
                     onMouseMove={(e) => {
                       if (this.isMouseInImg && isEnlarged) {
                         const xOffset = e.clientX - this.mousePreX;
                         const yOffset = e.clientY - this.mousePreY;
                         this.setState({
                           imgYOffset: imgYOffset + yOffset,
                           imgXOffset: imgXOffset + xOffset
                         });

                         this.mousePreY = e.clientY;
                         this.mousePreX = e.clientX;
                         this.setState({
                           test: 1
                         });
                       }
                     }}
                     onMouseLeave={() => {
                       this.isMouseInImg = false;
                     }}
                     onLoad={(e) => {
                       const {width, height} = e.target;
                       width / height > 780 / 500 ? this.enlargeDirection = 0 : this.enlargeDirection = 1;
                     }}/>
              </div>
            </div>
          </div>

          {/*图片列表区*/}
          {
            imgPool.length > 0 && <div className={`${prefixCls}-slidebar`}>
              {imgPool.map((item, index) => {
                return (
                  <div key={index}
                       onClick={() => {
                         this.toggleImg(index, 'index')
                       }}
                       className={`${prefixCls}-slidebar-item pointer ${this.state.currentImg === item ? 'image-modal-slidebar-item-now' : 'image-modal-slidebar-item-unchoosed'}`}>
                    <div></div>
                    <img src={item}/>
                  </div>
                )
              })}
            </div>
          }
        </div>
        <es-style/>
      </div>
    ) : null;
  }

  /** sliderScroll
   * @description 根据当前图片在池中的位置，滑动滚动条使其在合适的位置
   * @param index currentImg在imgPool中的位置
   * @param length imgPool的长度
   */
  sliderScroll = (index, length) => {
    const node = document.getElementsByClassName('image-modal-slidebar')[0];
    const location = (index + 1) / length * node.scrollWidth - 780 / 2;
    let resLocation;
    if (location < 0) {
      resLocation = 0;
    } else if (location > node.scrollWidth - node.offsetWidth) {
      resLocation = node.scrollWidth - node.offsetWidth;
    } else {
      resLocation = location;
    }
    node.scrollTo(resLocation, 0);
  };


  toggleSize = () => {
    const isEnlarged = this.state.isEnlarged;
    this.setState({
      isEnlarged: !isEnlarged,
      imgXOffset: 0,
      imgYOffset: 0
    })
  };


  /** toggleImg
   * @description  切换图片
   * @param type 切换模式 offset和非offset
   * @param index 若type === 'offset' 则index为偏移量，否则为在imgPool中的位置
   *
   */
  toggleImg = (index, type) => {
    const imgPool = this.props.imgPool;
    let newIndex;
    if (type === 'offset') {
      newIndex = this.currentIndex + index;
    } else {
      newIndex = index;
    }
    this.currentIndex = newIndex;
    if (newIndex >= imgPool.length) {
      this.currentIndex = 0;
      this.setState({
        currentImg: imgPool[0], isEnlarged: false
      });
    } else if (newIndex < 0) {
      this.currentIndex = imgPool.length - 1;
      this.setState({
        currentImg: imgPool[imgPool.length - 1], isEnlarged: false
      });
    } else {
      this.setState({
        currentImg: imgPool[newIndex], isEnlarged: false
      });
    }
    this.setState({
      imgXOffset: 0,
      imgYOffset: 0
    });
    this.sliderScroll(this.currentIndex, this.props.imgPool.length);
  }
}