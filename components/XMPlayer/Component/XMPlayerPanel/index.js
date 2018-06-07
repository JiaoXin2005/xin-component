import React, { Component } from 'react'
import {connect} from 'react-redux'
import { createAction } from '../../../../utils'
import { GlobalAudio } from '../../../../packages/player'

import SvgIcon from '../../../SvgIcon'

import Storage from '../../../../packages/player/utils/storage'
import prefixCls from '../../utils/constans'

import XMPlayerCover from './XMPlayerCover'
import XMPlayerCtrl from './XMPlayerCtrl'
import XMPlayerOprations from './XMPlayerOprations'
import XMPlayerProgress from './XMPlayerProgress'



@connect(({ GlobalXMPlayer }) => {
  return { GlobalXMPlayer }
})
class XMPlayerPanelUI extends Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    this.handleCloseListPanel()

    this.XMStorage = new Storage()
    let { player_setting: { lock } } = this.XMStorage.retrieve()
    this.props.dispatch(
      createAction('GlobalXMPlayer/refreshInfo')({ isLocked: lock })
    )
  }

  // 全局播放器鼠标移入逻辑
  handleMouseEnterHand = (e) => {
    let { isLocked } = this.props.GlobalXMPlayer
    if (isLocked) {
      return
    }
    this.$xmPlayer.style.bottom = 0
  }

  // 全局播放器鼠标移出逻辑
  handleMouseLeaveHand = () => {
    let { isLocked, isShowPlaylist} = this.props.GlobalXMPlayer

    if (isLocked || isShowPlaylist) {
      return
    }
    clearTimeout(this.handTimer)
    this.handTimer = setTimeout(() => {
      this.$xmPlayer.style.bottom = '-50px'
    }, 1000)
  }

  /* 播放器开锁控制 */
  handleLock = () => {
    let { isLocked } = this.props.GlobalXMPlayer
    this.props.dispatch(
      createAction('GlobalXMPlayer/refreshInfo')({ isLocked: !isLocked, isShowPlaylist: false, isShowVolume: false })
    )
    this.XMStorage.set('player_setting', { lock: !isLocked })
  }

  /* 处理面板的关闭 */
  handleCloseListPanel = (e) => {
    let $xmPlayer = document.getElementsByClassName('xm-player-case')[0]
    document.addEventListener('mouseup', (e) => {
      let target = e.target;
      if (!$xmPlayer.contains(target)) {
        let { isShowVolume, isShowPlaylist } = this.props.GlobalXMPlayer
        if (!isShowVolume && !isShowPlaylist) {
          return
        }
        this.props.dispatch({ type: 'GlobalXMPlayer/hideVolume' })
        this.props.dispatch({ type: 'GlobalXMPlayer/hidePlaylist'})
      }
    }, false)
  }

  saveRef = (name) => (el) => {
    this[name] = el
  }

  render () {
    let { GlobalXMPlayer: { isLocked } } = this.props

    return (
      <div
        className={`${prefixCls} ${isLocked ? 'is-locked' : 'is-unlocked'}`}
        ref={this.saveRef('$xmPlayer')}
        onMouseLeave={this.handleMouseLeaveHand}
      >
        <div className='hand'
          onMouseEnter={this.handleMouseEnterHand}
        ></div>
        <div className='box-shadow-wrapper'>
          <div className={`${prefixCls}-lock`} onClick={this.handleLock}>
            {
              isLocked
                ? <SvgIcon icon='icon-quanjubofangqi-suoding' width={10} height={10} />
                : <SvgIcon icon='icon-quanjubofangqi-kaisuo' width={10} height={10} />
            }
          </div>
        </div>
        <div className={`${prefixCls}-wrapper`}>
          <XMPlayerCover />
          <XMPlayerCtrl />
          <XMPlayerProgress/>
          <XMPlayerOprations />  
        </div>
      </div>
    )
  }
}

let XMPlayerPanel = () => <GlobalAudio Component={XMPlayerPanelUI}/>
export default XMPlayerPanel