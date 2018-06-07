import React, { Component } from 'react'
import { connect } from 'react-redux'
import SvgIcon from '../../../SvgIcon'
import { Audio } from '../../../../packages/player'
import prefixCls from '../../utils/constans'
import { debounce, createAction } from '../../../../utils'
import Track from './Track'

@connect(({ GlobalXMPlayer }) => {
  return { GlobalXMPlayer }
})
class XMPlayerPlaylistUI extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.handleScroll = debounce(this.handleScroll.bind(this), 200)
  }

  shouldComponentUpdate (nextProps) {
    let { GlobalXMPlayer: { isShowPlaylist }, player: { playlist } } = nextProps
    if (isShowPlaylist && !this.props.GlobalXMPlayer.isShowPlaylist ||
        !isShowPlaylist && this.props.GlobalXMPlayer.isShowPlaylist || 
        playlist.length !== this.props.player.playlist.length) { return true }
    return false
  }

  canLoadMore() {
    let space = 100
    let clientHeight = this.$listContent.clientHeight
    let scrollTop = this.$listContent.scrollTop
    let scrollHeight = this.$listContent.scrollHeight
    return (clientHeight + scrollTop + space) >= scrollHeight
  }

  handleScroll = () => {
    let { playListDataByAlbum } = this.props.player
    if (playListDataByAlbum === null || !playListDataByAlbum.hasMore) return false
    if (this.canLoadMore()) {
      this.props.dispatch(
        createAction('player/loadMorePlayList')()
      )
    }
  }

  render() {
    let { player: { playlist }, GlobalXMPlayer: { isShowPlaylist} } = this.props
    let count = playlist.length
    return (
      <div className={`${prefixCls}-list-wrapper ${isShowPlaylist ? '' : `${prefixCls}-list-wrapper_hide`} `}>

        <div className={`${prefixCls}-list`}>
          <div className={`${prefixCls}-list-head clearfix`}>
            <h4>播放列表({count})</h4>
            <div className='sort hidden'>
              <span className='orange-1'>正序</span>&nbsp;|&nbsp;
              <span>倒序</span>
            </div>
          </div>
          <div className={`${prefixCls}-list-content`}
            ref={(node) => this.$listContent = node}
            onScroll={this.handleScroll}>
            <ul >
              {
                playlist.map((item) => (
                  <Track
                    trackId={item.trackId}
                    track={item}
                    playlist={playlist}
                    key={item.trackId}
                  />
                ))
              }
            </ul>

          </div>
        </div>
      </div>
    )
  }
}

let XMPlayerPlaylist = () => <Audio Component={XMPlayerPlaylistUI} isGlobal={true}/>
export default XMPlayerPlaylist
