import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import './ProjectIcon.css'

export const ProjectIcon = ({ slug, size, className }) => (
  <div
    className={cx(className, 'project-icon', `project-icon-${slug}`)}
    style={{ '--scale': size / 64, width: `${size}px`, height: `${size}px` }}
  />
)

ProjectIcon.propTypes = {
  size: PropTypes.number,
  slug: PropTypes.string.isRequired,
  className: PropTypes.string
}

ProjectIcon.defaultProps = {
  size: 20,
  className: ''
}

export default ProjectIcon
