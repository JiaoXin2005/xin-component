import React, { Component } from 'react'
import { connect } from 'react-redux'
import SvgIcon from '../../../SvgIcon'
import { Audio } from '../../../../packages/player'
import prefixCls, { KEY_CODE } from '../../utils/constans'
import { PlayState } from '../../../../packages/player/constants'

class XMPlayerCtrlUI extends Component {

  componentDidMount() {
    document.body.addEventListener('keydown', this.bindHotkeys)
  }

  componentWillUnmount() {
    this.unbindHotkeys()
  }

  // 绑定快捷键
  bindHotkeys = (e) => {
    let tagName = e.target.tagName
    if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
      return false
    }
    if (Object.values(KEY_CODE).indexOf(e.keyCode) !== -1) {
      e.preventDefault()
    }
    let { playState } = this.props.player
    if (e.keyCode === KEY_CODE.SPACE) {
      this.handPlay()
    }
    if (e.keyCode === KEY_CODE.UP) {
      this.handlePrev()
    }
    if (e.keyCode === KEY_CODE.DOWN) {
      this.handleNext()
    }
    if (e.keyCode === KEY_CODE.LEFT) {
      this.props.seekWithSecond(-1)
    }
    if (e.keyCode === KEY_CODE.RIGHT) {
      this.props.seekWithSecond(1)
    }
  }

  // 取消绑定的快捷键
  unbindHotkeys = () => {
    document.body.removeEventListener('keydown', this.bindHotkeys)
  }

  handleNext = () => {
    this.props.next()
  }

  handlePrev = () => {
    this.props.prev()
  }

  // 调用xmplayer 播放api
  handPlay = () => {
    let { player, play, pause, resume, reset } = this.props
    let { playState } = player

    switch (playState) {
      case PlayState.STOPPED:
        let { currentTrack, playlist } = player
        play({ track: currentTrack, playlist })
        break;
      case PlayState.PAUSED:
        resume()
        break;
      case PlayState.PLAYING:
        pause()
        break;
      case PlayState.ERROR:
        reset()
        break;
      default:
        break;
    }
  }

  // 渲染播放或者暂停按钮
  renderPlayOrPauseBtn = () => {
    let { player } = this.props
    let { playState } = player
    let pauseBtn = (
      <a src='javascript:;' className='pause' onClick={this.handPlay}>
        <SvgIcon icon='icon-quanjubofangqi-zanting' width={30} height={30} />
      </a>
    )
    let playBtn = (
      <a src='javascript:;' className='play' onClick={this.handPlay}>
        <SvgIcon icon='icon-quanjubofangqi-bofang' width={30} height={30} />
      </a>
    )
    return playState === 'playing' ? pauseBtn : playBtn
  }

  render() {
    return (
      <div className={`${prefixCls}-btns fl`}>
        <a src='javascript:;' className='prev' onClick={this.handlePrev}>
          <SvgIcon icon='icon-quanjubofangqi-shangyiqu' width={10} height={10} />
        </a>
        {this.renderPlayOrPauseBtn()}
        <a src='javascript:;' className='next' onClick={this.handleNext}>
          <SvgIcon icon='icon-quanjubofangqi-xiayiqu' width={10} height={10} />
        </a>
      </div>
    )
  }
}

let XMPlayerCtrl = () => <Audio Component={XMPlayerCtrlUI} isGlobal={true}/>
export default XMPlayerCtrl
