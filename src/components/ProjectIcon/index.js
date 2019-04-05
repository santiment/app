import React from 'react'
import PropTypes from 'prop-types'
import DefaultProjectIcon from './DefaultProjectIcon'
import './ProjectIcon.css'

export const ProjectIcon = ({ name, size, ticker, className }) => {
  if (!name) {
    return <DefaultProjectIcon size={size} className={className} />
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
      return <DefaultProjectIcon size={size} className={className} />
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
  className: PropTypes.string
}

ProjectIcon.defaultProps = {
  size: 16,
  ticker: '',
  className: ''
}

export default ProjectIcon
