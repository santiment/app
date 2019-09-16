import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import './coordinates.css'

export const ProjectIcon = ({ name, size, className }) => {
  let formattedName =
    name &&
    name
      .toString()
      .toLowerCase()
      .split(/[ /.]+/)
      .join('-')

  if (formattedName === 'santiment-network-token') {
    formattedName = 'santiment'
  }

  formattedName = `project-icon-${formattedName}`

  return (
    <div
      className={cx(className, 'project-icon', formattedName)}
      style={{ '--scale': size / 64, width: `${size}px`, height: `${size}px` }}
    />
  )
}

ProjectIcon.propTypes = {
  size: PropTypes.number,
  name: PropTypes.string.isRequired,
  className: PropTypes.string
}

ProjectIcon.defaultProps = {
  size: 20,
  className: ''
}

export default ProjectIcon
