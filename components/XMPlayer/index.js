import React, {Component} from 'react'
import Award from 'award'
import model from './model'
Award.registerModel(model)
import './style.scss!'

import XMPlayerPanel from './Component/XMPlayerPanel'
import XMPlayerPlaylist from './Component/XMPlayerPlaylist'


class XMPlayer extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='xm-player-case'>
        <XMPlayerPanel />
        <XMPlayerPlaylist />
        <es-style/>
      </div>
    )
  }
}

export default XMPlayer