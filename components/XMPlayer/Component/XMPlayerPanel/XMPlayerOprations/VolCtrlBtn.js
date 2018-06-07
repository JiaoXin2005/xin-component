import React, { Component } from 'react'
import { connect } from 'react-redux'
import SvgIcon from '../../../../SvgIcon'
import Utils from '../../../utils'
import prefixCls from '../../../utils/constans'
import { createAction } from '../../../../../utils'
import { Audio } from '../../../../../packages/player'

@connect(({ GlobalXMPlayer }) =>{
  return { GlobalXMPlayer }
})
class VolCtrlBtnUI extends Component {

  constructor(props) {
    super(props)
    this.state = {
      seeking: false,
      seekPercent: 0 // 0 -1
    }
  }

  shouldComponentUpdate (nextProps) {
    if (nextProps.player.volume === this.props.player.volume && 
        nextProps.GlobalXMPlayer.isShowVolume === this.props.GlobalXMPlayer.isShowVolume) {
      return false
    }
    return true
  }

  componentDidMount() {
    this.getInitialOffSetTop()
    window.addEventListener('resize', () => {
      this.getInitialOffSetTop()
    })
    this.removeMouseMoveListener()
  }

  /* 显示音量按钮 */
  toggleVolumeBtnAudio = () => {
    let { isShowVolume } = this.props.GlobalXMPlayer
    if (isShowVolume) {
      this.props.dispatch({ 'type': 'GlobalXMPlayer/hideVolume'})
    } else {
      this.props.dispatch({ 'type': 'GlobalXMPlayer/showVolume' })      
    }
    // this.setState({
    //   showVolume: !this.state.showVolume
    // })
  }

  // 获取隐藏的声音面板offset
  getInitialOffSetTop = () => {
    this.xmplayVolume.style.visible = 'hidden'
    this.xmplayVolume.style.display = 'block'
    this.xmplayVolume.style.opacity = '0'

    this.initialOffSetTop = Utils.Offset.top(this.progressBar)

    this.xmplayVolume.removeAttribute('style')
    return this.initialOffSetTop
  }

  saveRef = (name) => (el) => {
    this[name] = el
  }

  removeMouseMoveListener = () => {
    let $xmplayer = document.querySelector('.xm-player-volume')
    $xmplayer.addEventListener('mouseup', this.handleMouseUp, false)
  }

  handleMouseUp = (e) => {
    document.querySelector('.xm-player-volume').onmousemove = null
    if (this.state.seeking) {
      let { seekPercent } = this.state
      this.props.setVolume(seekPercent)
      this.setState({ seeking: false })
    }
  }

  handleMouseDown = (e) => {
    let $xmplayer = document.querySelector('.xm-player-volume')
    let progressBarHeight = +this.progressBar.clientHeight    
    this.initialOffSetTop = Utils.Offset.top(this.progressBar)
    $xmplayer.onmousemove = (e) => {
      let clientY = e.clientY
      let devalue = this.initialOffSetTop + progressBarHeight - clientY
      devalue = devalue <= 0 ? 0 : devalue
      let percent = devalue / progressBarHeight >= 1 ? 1 : devalue / progressBarHeight
      this.setSeekPercent(percent)
    }

  }

  setSeekPercent = (percent) => {
    let height = percent * 100
    height = height >= 100 ? 100 : height
    this.progressCur.style.height = height + '%'
    this.setState({ seekPercent: percent, seeking: true })
  }


  // 音量按钮
  renderVolumeBtn = () => {
    let { player } = this.props
    let { volume } = player
    return volume === 0
      ? <SvgIcon icon='icon-quanjubofangqi-jingyin' width={18} height={18} />
      : <SvgIcon icon='icon-quanjubofangqi-yinliang' width={18} height={18} />
  }

  render() {
    let { player, GlobalXMPlayer: { isShowVolume } } = this.props
    let { volume } = player
    volume = volume * 100 + '%'
    return (
      <React.Fragment>
        <div className={`${prefixCls}-volume-wrapper ${isShowVolume ? 'showVolume' : ''}`}>
          <div className={`${prefixCls}-volume`}
            ref={this.saveRef('xmplayVolume')}
            >
            <div 
              className={`${prefixCls}-volume-progress`}
              onClick={this.handleClickProgress}
              ref={this.saveRef('progressBar')}
            >
              <i className={`${prefixCls}-volume_cur`}
                style={{ height: volume }}
                ref={this.saveRef('progressCur')}
              >
                <span className={`${prefixCls}-volume_btn`}
                  ref={this.saveRef('seekBtn')}
                  onMouseDown={this.handleMouseDown}
                  onClick={e => e.stopPropagation()}
                >
                  <SvgIcon icon='icon-quanjubofangqi-dian' width={10} height={10} />
                </span>
              </i>
            </div>
          </div>
        </div>
        <a src='javascript:;' className='btn'
          onClick={this.toggleVolumeBtnAudio}>
          {this.renderVolumeBtn()}
        </a>
      </React.Fragment>
    )
  }
}

let VolCtrlBtn = () => <Audio Component={VolCtrlBtnUI} isGlobal={true} />

export default VolCtrlBtn