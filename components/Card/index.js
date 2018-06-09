import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'award/router'

import './style/Card.scss'

/**
 * 卡片组件
 * @example ./examples/Readme.md
 */

class Card extends Component {
  constructor (props) {
    super(props)
    this.state = {
      children: this.props.children
    }
  }

  render () {
    const {
      prefixCls = 'xui-card',
      bordered = false,
      titleName, list, titleIcon,
      extra,
      children,
      className, ...divProps
    } = this.props

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-bordered`]: bordered
    })
    let extraNode = (<div className={prefixCls + '-extra'}>
      {typeof extra === 'string' ? <Link to={extra} rel="nofollow" className={prefixCls + '-extra-title'}>更多</Link>
        : extra
      }
    </div>)
    let titleNode = (
      <h3 className={prefixCls + '-head-title'} >
        {
          extra ? (
            <Link to={extra}>
              {titleIcon && titleIcon}
              {titleName}
            </Link>
          ) : (
            <React.Fragment>
              {titleIcon && titleIcon}
              {titleName}
            </React.Fragment>
          )
        }
        {extra && extraNode}
      </h3>
    )
    let head = (<div className={prefixCls + '-head'}>{titleNode}</div>) // head-dom
    let listNode = list && list.map((item, index) => (
      <p key={index} className='list-item'>
        {item.title}
      </p>
    ))
    let body = (
      <div className={prefixCls + '-body'}>{children || listNode}</div>
    )

    return (
      <div {...divProps} className={classString}>
        { head }
        { body }
      </div>
    )
  }
}

Card.propTypes = {
  /* 标题的icon */
  titleIcon: PropTypes.element,
  /* 卡片右上角的操作区域 例如：'http://www.ximalaya.com' 或者 <a href='xxxx'>more</a>  */
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** 标题 */
  titleName: PropTypes.string,
  /** 列表数据 例如: [{title, url},{title, url}] */
  list: PropTypes.array,
  /** 边框 */
  bordered: PropTypes.bool
}
Card.defaultProps = {
  bordered: false
}

export default Card
