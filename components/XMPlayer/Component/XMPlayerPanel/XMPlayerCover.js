import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'award/router'
import { Audio } from '../../../../packages/player'
import prefixCls from '../../utils/constans'

class XMPlayerCoverUI extends Component {

  shouldComponentUpdate (nextProps) {
    /* 播放器的playState会阶段性改变，但该组件只希望render一次 */
    if (this.props.player.currentTrack && nextProps.player.currentTrack) {
      if (nextProps.player.currentTrack.trackId === this.props.player.currentTrack.trackId) {
        return false
      }
    }
    return true
  }

  render () {
    let { player: { currentTrack } } = this.props
    let { trackCoverPath, trackName, duration, trackUrl = '' } = currentTrack || { }

    return (
      <Link to={trackUrl} className={`${prefixCls}-cover fl`}>
        <img src={trackCoverPath} />
      </Link>
    )
  }
}

let XMPlayerCover = ()=> <Audio Component={XMPlayerCoverUI} isGlobal={true}/>
export default XMPlayerCover
  
