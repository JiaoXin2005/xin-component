import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'award/router'
import SvgIcon from '../../../SvgIcon'
import { Audio, PlayerProgress, PlayState } from '../../../../packages/player'
import prefixCls from '../../utils/constans'
import Utils from '../../utils'

class XMPlayerProgressUI extends Component {

  seekPlayerPercent = (percent) => {
    this.props.seek(percent)
  }

  render() {
    let { player: { currentTrack } } = this.props
    let { trackName, trackUrl = '' } = currentTrack || {}

    return (
      <div className={`${prefixCls}-body fl`}>
        <div className={`${prefixCls}-body-title`}>
          <Link to={trackUrl} className='fm-title' title={trackName || '喜马拉雅FM'}> {trackName || '喜马拉雅FM'}</Link>
        </div>
        <ProgressBar currentTrack={currentTrack} seekPlayerPercent={this.seekPlayerPercent}/>
      </div>
    )
  }
}

// -----------------分割线-----------------

/* 下方的精度条 */
class ProgressBarUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seeking: false,
      seekPercent: 0 // 0 -1
    }
  }

  /* 点击进度条 */
  hanldeClickProgress = (e) => {
    let clientX = e.clientX
    let progressBarWidth = this.progressBar.clientWidth
    let offSetLeft = Utils.Offset.left(this.progressCur)
    let percent = (clientX - offSetLeft) / progressBarWidth
    this.progressCur.style.width = percent * 100 + '%'
    this.setState({ seekPercent: percent, seeking: true })
    this.props.seekPlayerPercent(percent)
    setTimeout(() => {
      this.setState({ seeking: false })
    }, 100);
  }

  handleMouseDown = (e) => {
    e.persist()
    let $xmplayer = document.querySelector('.xm-player')
    let progressBarWidth = +this.progressBar.clientWidth
    let offSetLeft = Utils.Offset.left(this.progressCur)

    $xmplayer.onmousemove = (e) => {
      let clientX = e.clientX
      let percent = (clientX - offSetLeft) / progressBarWidth
      let width = percent * 100
      width = width >= 100 ? 100 : width
      this.progressCur.style.width = width + '%'
      this.setState({ seekPercent: percent, seeking: true })
    }
  }

  handleMouseUp = (e) => {
    document.querySelector('.xm-player').onmousemove = null
    if (this.state.seeking) {
      let { seekPercent } = this.state
      this.props.seekPlayerPercent(seekPercent)
      this.setState({ seeking: false })
    }
  }

  removeMouseMoveListener = () => {
    let $xmplayer = document.querySelector('.xm-player')
    $xmplayer.addEventListener('mouseup', this.handleMouseUp, false)
  }

  saveRef = (name) => (el) => {
    this[name] = el
  }

  componentDidMount() {
    this.removeMouseMoveListener()
  }

  render() {
    let { cachePercent, playPercent, currentTime, player, currentTrack } = this.props
    let { trackName, duration, trackUrl = '' } = currentTrack || {}

    let { seeking, seekPercent } = this.state

    cachePercent = cachePercent * 100 + '%'
    playPercent = playPercent * 100 + '%'
    currentTime = (seeking)
      ? Utils.Time.stringify(duration * seekPercent, 'hh:mm:ss')
      : Utils.Time.stringify(currentTime, 'hh:mm:ss')

    duration = Utils.Time.stringify(duration, 'hh:mm:ss')

    return (
      <div>
        <div className={`${prefixCls}-progress`}
          ref={this.saveRef('progressBar')}
          onClick={this.hanldeClickProgress}
        >
          <i className={`${prefixCls}-progress_load`} style={{ width: cachePercent }}></i>
          <i className={`${prefixCls}-progress_cur`} style={{ width: playPercent }}
            ref={this.saveRef('progressCur')}>
            <span className={`${prefixCls}-progress_btn`}
              ref={this.saveRef('seekBtn')}
              onMouseDown={this.handleMouseDown}
              onClick={e => e.stopPropagation()}
            >
              <SvgIcon icon='icon-quanjubofangqi-dian' width={10} height={10} />
            </span>
          </i>
        </div>
        <div className={`${prefixCls}-playtime`}>
          {currentTime}<span className='gray-9'> / {duration}</span>
        </div>
      </div>
    )
  }
}

let ProgressBar = ({...props}) => <PlayerProgress Component={ProgressBarUI} {...props}/>
let XMPlayerProgress = () => <Audio Component={XMPlayerProgressUI} isGlobal={true}/>

export default XMPlayerProgress
