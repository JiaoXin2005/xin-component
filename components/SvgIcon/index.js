import React, { Component } from 'react'
import PropTypes from 'prop-types'

const SvgIcon = ({ icon, height = '14', width = '14', style, className='' }) => (
  <svg className={`icon ${icon} ${className}`} style={style} width={width} height={height}>
    <use xlinkHref={`#${icon}`} />
  </svg>
)

SvgIcon.propTypes = {
  icon: PropTypes.string.isRequired
}

export default SvgIcon
