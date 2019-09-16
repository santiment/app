import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import './coordinates.css'

export const ProjectIcon = ({ name, size, className }) => {
  let imgName =
    name &&
    `project-icon-${name
      .toString()
      .toLowerCase()
      .split(/[ /.]+/)
      .join('-')}`

  return (
    <div
      className={cx(className, 'project-icon', imgName)}
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
  ticker: '',
  className: ''
}

export default ProjectIcon
