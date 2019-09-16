import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import DefaultProjectIcon from './DefaultProjectIcon'
import './coordinates.css'

export const ProjectIcon = ({ name, size, ticker, className }) => {
  if (!name) {
    return <DefaultProjectIcon size={size} className={className} />
  }
  let imgSource = name
    .toString()
    .toLowerCase()
    .split(/[ /.]+/)
    .join('-')

  return (
    <div
      className={cx(className, `project-icon project-icon-${imgSource}`)}
      style={{ '--scale': size / 64, width: `${size}px`, height: `${size}px` }}
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
