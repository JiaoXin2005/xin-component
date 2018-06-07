import React, {Component} from 'react'
import PropTypes from 'prop-types'
import LinkTo from './LinkTo'

import './slider.scss!'

/**
 * banner Slider组件
 *
 * @example ./examples/Readme.md
 */
export default class Slider extends Component {
  constructor (props) {
    super(props)
    var {list = [], options} = this.props

    this.options = Object.assign({
      aspectRatio: 2.18,
      imgWidth: 0,
      onPre: () => {}, // 上一张
      onNext: () => {}, // 下一张
      isAuto: true, // 是否自动滚动
      delay: 5000, // 自动滚动间隔
      isSwitch: true, // 底部分段
      isCycle: true, // 是否循环
      direc: 1,    // 滑动方向 ,1 向左滑， 其他：向右滑
      offsetWidth: 0 // 总宽度
    }, options)

    this.state = {list, imgWidth: this.options.imgWidth, imgHeight: 0, styleList: [], curIndex: 0, size: list.length, isAnim: ''}
    this.onMouseOut = this.onMouseOut.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onScreenLeft = this.onScreenLeft.bind(this)
    this.onScreenRight = this.onScreenRight.bind(this)
    this.resize = this.resize.bind(this)
    var imgHeight = parseInt(this.options.imgWidth / this.options.aspectRatio)
    this.setStyle(this.options.imgWidth || 0, imgHeight || 0, list)
  }

  getOffsetWidth () {
    return this.options.offsetWidth || (this.target && this.target.offsetWidth)
  }

  componentWillMount () {
    // this.setStyle(0, 0, [])
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.list !== this.props.list) {
      this.reflushStyle(this.getOffsetWidth())
      this.run()
      const { list } = nextProps
      this.setState({
        list,
        imgWidth: this.options.imgWidth,
        imgHeight: 0,
        styleList: [],
        curIndex: 0,
        size: list.length
      })
    }
  }

  componentDidMount () {
    var offsetWidth = this.getOffsetWidth()
    this.reflushStyle(offsetWidth)
    this.run()
    window.addEventListener('resize', this.resize)
    this.setState({defwidth: offsetWidth})
    // 延迟初始化的动画
    setTimeout(() => {
      this.setState({isAnim: 'is-anim'})
    }, 0)
  }

  resize () {
    var offsetWidth = this.getOffsetWidth()
    this.reflushStyle(offsetWidth)
    this.setState({defwidth: offsetWidth})
  }

  reflushStyle (offsetWidth) {
    var aspectRatio = this.options.aspectRatio
    var imgHeight = parseInt(offsetWidth / aspectRatio)
    var imgWidth = this.state.imgWidth
    var useDefWidth = true
    if (imgWidth) {
      if (offsetWidth < imgWidth || offsetWidth < (imgWidth + 10)) {
        console.wran('容器宽度小于或接近设置的图片宽度')
      } else {
        imgHeight = parseInt(imgWidth / aspectRatio)
        useDefWidth = false
      }
    }

    if (useDefWidth) {
      imgWidth = offsetWidth * 0.8
      imgHeight = parseInt(imgWidth / aspectRatio)
    }

    this.setStyle(imgWidth, imgHeight, this.state.list)
  }

  setStyle (imgWidth, imgHeight, list) {
    var offset
    var styleList = []
    imgHeight = imgHeight || 300
    if (imgWidth) {
      offset = parseInt((this.getOffsetWidth() - imgWidth) / 2)
      styleList = list.map((item, key) => {
        var params = {
          other: 'z-index:1;opacity:0;',
          offset: offset * (key - 1) + 1,
          scale: '0.81',
          wkscale: '0.81'
        }
        if (key === 0) {
          params._offset = `-${offset}`
        } else if (key === 1) {
          params.offset = params.offset - 1
          params.other = 'transform-origin: 0% 50%;opacity:0.8;'
        } else if (key === 2) {
          params.other = 'z-index:3;'
          params.wkscale = '1.24'
          params.scale = '1'
          params.offset = offset
        } else if (key === 3) {
          params.other = 'transform-origin: 100% 50%;z-index:1;opacity:0.8;'
        }
        return `
        .xui-slider-item-${key} {
          -webkit-transform:translate(${params.offset}px,0) scale(${params.wkscale});
          -ms-transform:translate(${params.offset}px,0) scale(${params.scale});
          transform:translate(${params.offset}px,0) scale(${params.scale});
          ${params.other || ''}
        }`
      })
    }

    this._style = `
      .xui-slider-warp, .xui-slider-list {
        position:relative;
        height: ${imgHeight}px;

      }
      .xui-slider-warp .pic {
        width:${imgWidth}px;
        height: ${imgHeight}px;
      }

      .xui-slider-item {
        width:${imgWidth}px;
        height: ${imgHeight}px;
      }

      .xui-slider-item.is-anim {
        -webkit-transition: all 300ms ease-out;
        -moz-transition: all 300ms ease-out;
        transition: all 300ms ease-out;
      }
      ${styleList.join('')}
    `
  }

  run () {
    if (!this.options.isAuto) { return }
    this.timeId && clearInterval(this.timeId)
    this.timeId = setInterval(() => {
      this.setState((prevState, props) => {
        prevState.curIndex = prevState.curIndex >= prevState.list.length
          ? 0
          : prevState.curIndex + 1
        // console.log(prevState, prevState.list.length)
        return prevState
      })
    }, 3000)
  }

  onMouseOut () {
    this.run()
  }

  onMouseOver () {
    this.timeId && clearInterval(this.timeId)
  }

  onScreenLeft (e) {
    this.moveOne((curIndex, size) => {
      return curIndex - 1 < 0 ? size - 1 : curIndex - 1
    })
    this.options.onPre && this.options.onPre(e)
  }

  onScreenRight (e) {
    this.moveOne((curIndex, size) => {
      return curIndex + 1 < size ? curIndex + 1 : 0
    })
    this.options.onNext && this.options.onNext(e)
  }

  moveOne (moveHander) {
    this.setState((prevState, props) => {
      prevState.curIndex = moveHander(prevState.curIndex, prevState.size)
      return prevState
    })
    this.timeId && clearInterval(this.timeId)
    setTimeout(() => this.run(), 2000)
  }

  componentWillUnmount () {
    this.timeId && clearInterval(this.timeId)
    window.removeEventListener('resize', this.resize)
  }

  render () {
    var leng = this.state.list.length
    return (
      <div className='xui-slider'
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
        ref={(target) => { this.target = target }}>
        <style>
          {this._style}
        </style>
        <div className='xui-slider-warp'>
          <i className='operation-left-btn' onClick={this.onScreenLeft} />
          <i className='operation-right-btn' onClick={this.onScreenRight} />
          {/* <div className='xui-slider-operation'>
            <div className='operation-left'>
              <i className='operation-left-btn' onClick={this.onScreenLeft} />
            </div>
            <div className='operation-right'>
              <i className='operation-right-btn' onClick={this.onScreenRight} />
            </div>
          </div> */}
          <ul className='xui-slider-list'>
            {
              this.state.list.map((item, key) => {
                var index = ((key + this.state.curIndex) % leng)
                if (this.options.direc === 1) {
                  index = leng - 1 - index
                }

                return (
                  <li className={`xui-slider-item xui-slider-item-${index} ${this.state.isAnim}`} key={key} data-index={key}>
                    <LinkTo to={item.url || 'javascript:;'}>
                      <img className='pic'
                        src={item.imgUrl}
                        title={item.title}
                        alt={item.title} />
                    </LinkTo>
                  </li>
                )
              })
            }
          </ul>
          {/* <div className='xui-slider-switch'></div> */}
        </div>
        <es-style/>
      </div>
    )
  }
}

Slider.propTypes = {
  /** 列表数据 例如: [{imgUrl, linkUrl, title},{imgUrl, linkUrl, title}] */
  list: PropTypes.array.isRequired,
  onPre: PropTypes.func,
  onNext: PropTypes.func,
  isAuto: PropTypes.bool,
  delay: PropTypes.number,
  cycle: PropTypes.bool, // 是否循环
  thum: PropTypes.bool, // 是否有缩略
  imgWidth: PropTypes.number,
  /**
   * {
   *  isAuto, imgWidth, onPre, onNext
   * }
   */
  options: PropTypes.object
}

Slider.defaultProps = {
  isAuto: true,
  delay: 4000,
  cycle: true
}
