import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss!'

import spriteSvg from '../../static/svg/symbol/svg/sprite.symbol.svg'

const SvgIcon = ({ icon, height = '14', width = '14', style }) => (
  <div className='svgIcon'>
    <svg className={`icon icon-${icon}`} style={style} width={width} height={height}>
      <use xlinkHref={`${spriteSvg}#${icon}`} />
    </svg>
    <es-style />
  </div>
)

SvgIcon.propTypes = {
  icon: PropTypes.string.isRequired
}

export default SvgIcon
