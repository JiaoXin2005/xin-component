import React, {Component} from 'react'
import { Link } from 'award/router'
import DropDown from './dropDown'
import PropTypes from 'prop-types'

import './style.scss'
/**
 * 面包屑组件
 * @example ./examples/Readme.md
 */
export default class BreadCrumb extends Component {
  render () {
    const { routes, lastClickAble } = this.props
    let paths = []
    return (
      <div className='bread-crumb'>
        {
          routes.map((route, index) => {
            route.path = route.path || ''
            {/* let path = route.path.replace(/^\//, '') */}
            {/* if (path) paths.push(path) */}
            return (
              <span key={index} className='bread-crumb-item'>
                { itemRender(route, routes, paths, lastClickAble) }
                <span className='bread-crumb-separator'>></span>
              </span>
            )
          })
        }
      </div>
    )
  }
}

function itemRender(route, routes, paths, lastClickAble) {
  if (route.dropList && route.dropList.length) {
    return <DropDown name={route.name} list={route.dropList} />
  }
  if (lastClickAble) {
    return <Link className='bread-crumb-link' to={route.path}>{route.name}</Link>
  }
  const last = routes.indexOf(route) === routes.length - 1
  return last ? <span className='bread-crumb-link'>{route.name}</span> : <Link className='bread-crumb-link' to={route.path}>{route.name}</Link>
}

BreadCrumb.propTypes = {
  test: PropTypes.string
}

BreadCrumb.defaultProps = {

}
