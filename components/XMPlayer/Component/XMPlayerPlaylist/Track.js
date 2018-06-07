import React, { Component } from 'react'
import { connect } from 'react-redux'
import SvgIcon from '../../../SvgIcon'
import { Audio } from '../../../../packages/player'
import prefixCls from '../../utils/constans'
import { PlayState } from '../../../../packages/player/constants'

class TrackUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      iconDomState: 'default', // default 、playing 、pause 、play
    }
    this.beforeMouseEnterState = '' // 记录鼠标移入前的状态
  }

  componentWillReceiveProps(nextProps) {
    let { playState } = this.props.player
    if (nextProps.isSelectingTrack && !nextProps.isCurrentTrack) { // 如果切换到不可播的声音，重置iconstate
      this.setState({ iconDomState: 'default' }, () => {
        this.beforeMouseEnterState = 'default'
      })
    }
    this.setPauseState(nextProps)
  }

  setPauseState = (nextProps) => {
    let { track, isCurrentTrack, player: { playState } } = nextProps
    if (!isCurrentTrack) {
      return
    }
    if (playState === PlayState.PAUSED) {
      this.setState({ iconDomState: 'play' }, () => {
        this.beforeMouseEnterState = 'play'
      })
    } else if (playState === PlayState.PLAYING) {
      this.setState({ iconDomState: 'playing' }, () => {
        this.beforeMouseEnterState = 'playing'
      })
    } else {
      this.setState({ iconDomState: 'default' }, () => {
        this.beforeMouseEnterState = 'default'
      })
    }
  }


  /* 鼠标移入后改变不同状态下的icon */
  handleMouseEnter = (e) => {
    let { isCurrentTrack, player } = this.props
    let { playState } = player
    this.beforeMouseEnterState = this.state.iconDomState
    if (playState === PlayState.PLAYING) {
      if (isCurrentTrack) {
        this.setState({ iconDomState: 'pause' })
      } else {
        this.setState({ iconDomState: 'play' })
      }
    } else {
      this.setState({ iconDomState: 'play' })
    }
  }

  handleMouseLeave = (e) => {
    // 恢复鼠标移入之前的icon状态
    this.setState({ iconDomState: this.beforeMouseEnterState })
  }


  handlePlay = () => {
    let { isCurrentTrack, player, play, pause, resume } = this.props
    let { playState } = player
    if (isCurrentTrack) {
      if (playState === PlayState.PAUSED) {
        this.setState({ iconDomState: 'playing' }, () => {
          this.beforeMouseEnterState = this.state.iconDomState
        })
        resume()
      } else if (playState === PlayState.PLAYING) {
        pause()
        this.setState({ iconDomState: 'pause' }, () => {
          this.beforeMouseEnterState = 'play'
        })
      } else if (playState === PlayState.STOPPED) {
        play({ track: this.props.track, playlist: this.props.playlist })
        this.setState({ iconDomState: 'playing' }, () => {
          this.beforeMouseEnterState = this.state.iconDomState
        })
      }
    } else {
      play({ track: this.props.track, playlist: this.props.playlist })
      this.setState({ iconDomState: 'playing' }, () => {
        this.beforeMouseEnterState = this.state.iconDomState
      })
    }

  }

  renderIconDom = () => {
    let { track, currentTrack } = this.props.player
    let playIcon = <SvgIcon icon='icon-web_album_btn_play_s' />
    let pauseIcon = <SvgIcon icon='icon-web_album_btn_stop' />
    let playingIcon = <div className='xui-playing'><i />&nbsp;<i />&nbsp;<i />&nbsp;<i /></div>
    let number = this.props.track.index || ''
    let { iconDomState } = this.state
    let iconDomMap = {
      default: number,
      playing: playingIcon,
      pause: pauseIcon,
      play: playIcon
    }

    return iconDomMap[iconDomState]
  }

  render() {
    let { player, isCurrentTrack, track } = this.props
    let { trackName, albumName, updateTime, createTime } = track

    return (
      <li className='row clearfix '
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handlePlay}
      >
        <div className='col-1'>
          {this.renderIconDom()}
        </div>
        <div className={`col-2 ${isCurrentTrack ? 'is-playing' : ''}`}>{trackName}</div>
        <div className='col-3'>{albumName}</div>
        <div className='col-4'>{createTime}</div>
      </li>
    )
  }
}

let Track = ({ Component, ...others }) => <Audio Component={TrackUI} {...others}/>
export default Track
