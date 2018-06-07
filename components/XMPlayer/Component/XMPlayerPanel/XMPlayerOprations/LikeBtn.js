import React, { Component } from 'react'
import { connect } from 'react-redux'
import SvgIcon from '../../../../SvgIcon'
import utils from '../../../../../utils'
import albumDetailPage from '../../../../../apis/albumDetailPage'

import Storage from '../../../../../packages/player/utils/storage'

@connect()
class LikeBtn extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      isLike: false // 喜欢的状态
    }
  }

  componentDidMount () {
    this.XMStorage = new Storage()
  }

  componentWillReceiveProps (nextProps) {
    this.state.isLike = nextProps.currentTrack.isLike
  }
  
  /* 处理声音是否点赞 */
  handleLikeTrack = (e) => {
    e.preventDefault()
    let { currentTrack } = this.props
    let { trackId } = currentTrack || {}
    let { isLike } = this.state
    if (!currentTrack) return
    if (utils.isLogout()) {
      this.props.dispatch({ type: 'RootPage/openLoginPop'})
      return
    }
    if (isLike) {
      albumDetailPage.like.cancelLikeTrack({ trackId })
      this.setState({ isLike: false })
      this.XMStorage.set('player_track', { isLike: false })
    } else {
      albumDetailPage.like.setLikeTrack({ trackId })
      this.setState({ isLike: true })
      this.XMStorage.set('player_track', { isLike: true })
    }
  }

  // 点赞按钮
  renderLikeBtn = () => {
    let { isLike } = this.state
    let likeIconCls = isLike ? 'icon-quanjubofangqi-zanliao' : 'icon-quanjubofangqi-dianzan'
    return (
      <a src='javascript:;' className='btn' onClick={this.handleLikeTrack} >
        <SvgIcon icon={likeIconCls} width={18} height={18} />
      </a>
    )
  }

  render () {
    return this.renderLikeBtn()
  }
}

export default LikeBtn