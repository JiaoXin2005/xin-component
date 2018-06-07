import React, { Component } from 'react'
import { Link } from 'award/router'

class LinkTo extends Component {

  isCompleteUrl(to) {
    return /^(http(s)?\:)(\/\/)/.test(to)
  }

  render () {
    let { to, children, ...rest } = this.props
    const flag = this.isCompleteUrl(to)
    return (
      flag 
        ? <a href={to} {...rest} target="_blank">{children}</a>
        : <Link to={to} {...rest}>{children}</Link>
    )
  }
}

export default LinkTo