import React, { Component } from 'react'
import { connect } from 'react-redux'
import SvgIcon from '../../../../SvgIcon'
import { Audio } from '../../../../../packages/player'
import prefixCls from '../../../utils/constans'

import LikeBtn from './LikeBtn'
import DownloadBtn from './DownloadBtn'
import ShareBtn from './ShareBtn'
import VolCtrlBtn from './VolCtrlBtn'
import PlayModeBtn from './PlayModeBtn'
import PlaylistBtn from './PlaylistBtn'

// import XMPlayerVolCtrl from './XMPlayerVolCtrl'
// import XMPlayerPlayMode from './XMPlayerPlayMode'

class XMPlayerOprationsUI extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      showVolume: false, // 显示音量调节
      isLike: false
    }
  }

  // 点赞按钮
  renderLikeBtn = () => {
    let { isLike = false } = this.state
    let likeIconCls = isLike ? 'icon-quanjubofangqi-zanliao' : 'icon-quanjubofangqi-dianzan'
    return (
      <a src='javascript:;' className='btn' onClick={this.handleLikeTrack} >
        <SvgIcon icon={likeIconCls} width={18} height={18} />
      </a>
    )
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
    let { player: { currentTrack } } = this.props
    let { showVolume } = this.state

    return (
      <div>
        <div className={`${prefixCls}-oprations fl`}>
          <LikeBtn currentTrack={currentTrack}/>
          <DownloadBtn />
          <ShareBtn currentTrack={currentTrack}/>
          {/* {this.renderLikeBtn()} */}
          {/* <a src='javascript:;' className='btn' onClick={this.handleDownload}>
            <SvgIcon icon='icon-quanjubofangqi-xiazai' width={18} height={18} />
          </a> */}
          {/* <a src='javascript:;' className='btn' onClick={this.handleShare} >
            <SvgIcon icon='icon-quanjubofangqi-fenxiang' width={18} height={18} />
          </a> */}
        </div>
        <div className={`${prefixCls}-controls fl ${showVolume ? 'showVolume' : ''}`}>
          <VolCtrlBtn />
          <PlayModeBtn />
          <PlaylistBtn />
          {/* <div className={`${prefixCls}-volume-wrapper`}>
            <XMPlayerVolCtrl
              volume={volume}
              setPlayerVolume={this.setPlayerVolume} />
          </div>
          <a src='javascript:;' className='btn'
            onClick={this.handleShowVolumeBtn}>
            {this.renderVolumeBtn()}
          </a> */}
          {/* <XMPlayerPlayMode /> */}
          {/* <a src='javascript:;' className='btn'
            onClick={this.handleShowPlaylist}
          >
            <SvgIcon icon='icon-quanjubofangqi-bofangliebiao' width={18} height={18} />
          </a> */}
        </div>
      </div>
    )
  }
}

let XMPlayerOprations = () => <Audio Component={XMPlayerOprationsUI} isGlobal={true} />
export default XMPlayerOprations
