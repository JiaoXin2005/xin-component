import React, { Component } from 'react'
import { connect } from 'react-redux'
import SvgIcon from '../../../../SvgIcon'
import { createAction } from '../../../../../utils'

@connect()
class ShareBtn extends Component {

  /* 分享弹窗 */
  handleShare = () => {
    let { currentTrack } = this.props
    if (!currentTrack) return
    let { isPaid, trackId, trackName, trackUrl, albumName, trackCoverPath } = currentTrack
    let bdUrl = location.origin + trackUrl
    let bdDesc = '喜马拉雅好声音'
    let bdText = `很喜欢#喜马拉雅${isPaid ? '付费精品区' : ''}#${albumName}的节目${trackName}，听点有用的，每天进步一点点！`
    let bdPic = trackCoverPath
    this.props.dispatch(
      createAction('ShareDialog/openShareDialog')({
        bdText,
        bdDesc,
        bdUrl,
        bdPic,
        type: 'track',
        trackId
      })
    )
  }

  render() {
    return (
      <a src='javascript:;' className='btn' onClick={this.handleShare} >
        <SvgIcon icon='icon-quanjubofangqi-fenxiang' width={18} height={18} />
      </a>
    )
  }
}

export default ShareBtn