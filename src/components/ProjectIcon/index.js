import React from 'react'
import PropTypes from 'prop-types'
import { setDisplayName } from 'recompose'
import DefaultProjectIcon from './DefaultProjectIcon'
import './ProjectIcon.css'

export const DefaultIcon = () => ''

export const ProjectIcon = ({
  name,
  size,
  ticker,
  className,
  useFallbackIcon
}) => {
  const Icon = useFallbackIcon ? DefaultProjectIcon : DefaultIcon
  if (!name) {
    return <Icon size={size} />
  }
  let imgSource = ''
  try {
    imgSource = require(`../../assets/project-icons/${name
      .toString()
      .toLowerCase()
      .split(/[ /.]+/)
      .join('-')}.png`)
  } catch (e) {
    try {
      imgSource = require(`../../assets/32x32/${ticker}-32.png`)
    } catch (e) {
      return <Icon size={size} />
    }
  }
  return (
    <img
      width={size}
      alt={name}
      height={size}
      src={imgSource}
      className={className}
    />
  )
}

ProjectIcon.propTypes = {
  size: PropTypes.number,
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string,
  className: PropTypes.string,
  useFallbackIcon: PropTypes.bool
}

ProjectIcon.defaultProps = {
  size: 16,
  ticker: '',
  className: '',
  useFallbackIcon: false
}

export default setDisplayName('ProjectIcon')(ProjectIcon)
