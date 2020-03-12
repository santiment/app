import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import styles from './ProjectIcon.module.scss'

export const ProjectIcon = ({
  slug,
  logoUrl,
  darkLogoUrl,
  size,
  className
}) => (
  <img
    src={logoUrl}
    width={size}
    height={size}
    className={cx(styles.logo, className)}
    alt={slug}
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
