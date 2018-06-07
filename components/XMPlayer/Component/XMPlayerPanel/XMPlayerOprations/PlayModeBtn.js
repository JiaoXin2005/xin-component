import React, { Component } from 'react'
import { Audio } from '../../../../../packages/player'

import SvgIcon from '../../../../SvgIcon'

const prefixCls = 'xm-player'

class PlayModeUI extends Component {
  constructor (props) {
    super(props)
  }

  shouldComponentUpdate (nextProps) {
    if (nextProps.player.playMode === this.props.player.playMode) {
      return false
    }
    return true
  }
  
  handleClick = () => {
    let { player, setPlayMode } = this.props
    let { playMode } = player
    let newModeMap = {
      'list': 'loop',
      'loop': 'random',
      'random': 'list'
    }
    setPlayMode(newModeMap[playMode])
  }

  renderPlayModeBtn = () => {
    let { player } = this.props
    let { playMode } = player
    let randomBtn = <SvgIcon icon='icon-quanjubofangqi-suiji' width={18} height={18} />
    let listBtn = <SvgIcon icon='icon-quanjubofangqi-xunhuan' width={18} height={18} />
    let loopBtn = <SvgIcon icon='icon-quanjubofangqi-danquxunhuan' width={18} height={18} />
    let btnMap = {
      'list': listBtn,
      'loop': loopBtn,
      'random': randomBtn
    }
    return btnMap[playMode]
  }


  render () {
    return (
      <a src='javascript:;' className='btn'
        onClick={this.handleClick}
        >
        {this.renderPlayModeBtn()}
      </a>
    )
  }
}

let PlayMode = () => <Audio Component={PlayModeUI} isGlobal={true} />

export default PlayMode