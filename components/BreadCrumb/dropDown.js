import React, { Component } from 'react'
import { Link } from 'award/router'

import './dropDown.scss'

// dropDown for breadCrumb
export default class DropDown extends Component {
  render() {
    const { name, list } = this.props
    return (
      <div className='bread-crumb-drop'>
        <div className='bread-crumb-drop-trigger'>
          {name}
          <span className='arrow arrow-up'>^</span>
        </div>
        <div className='bread-crumb-drop-main'>
          <ul className='bread-crumb-drop-list'>
            {
              list.map(e => {
                return <li key={e.id}><Link className='bread-crumb-link' to={e.link}>{e.displayValue||e.displayName}</Link></li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}
