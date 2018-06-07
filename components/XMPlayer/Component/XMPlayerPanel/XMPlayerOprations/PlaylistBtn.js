import React, { Component } from 'react'
import { connect } from 'react-redux'
import SvgIcon from '../../../../SvgIcon'

@connect(({GlobalXMPlayer}) => {
  return { GlobalXMPlayer }
})
class PlaylistBtn extends Component {

  handleShowPlaylist = () => {
    let { isShowPlaylist } = this.props.GlobalXMPlayer
    if (isShowPlaylist) {
      this.props.dispatch({ type: 'GlobalXMPlayer/hidePlaylist'})
    } else  {
      this.props.dispatch({ type: 'GlobalXMPlayer/showPlaylist' })      
    }
  }

  render () {
    return (
      <a src='javascript:;' className='btn'
        onClick={this.handleShowPlaylist}
      >
        <SvgIcon icon='icon-quanjubofangqi-bofangliebiao' width={18} height={18} />
      </a>
    )
  }
}

export default PlaylistBtn