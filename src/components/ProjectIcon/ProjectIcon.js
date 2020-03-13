import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import PropTypes from 'prop-types'
import styles from './ProjectIcon.module.scss'

export const ProjectIcon = ({
  slug,
  logoUrl,
  darkLogoUrl,
  size,
  isNightMode,
  className
}) => {
  const darkLogo = darkLogoUrl || logoUrl
  const logo = isNightMode ? darkLogo : logoUrl

  return (
    <img
      src={logo}
      width={size}
      height={size}
      className={cx(styles.logo, className)}
      alt={slug}
    />
  )
}

const mapStateToProps = ({ rootUi: { isNightModeEnabled } }) => ({
  isNightMode: isNightModeEnabled
})

ProjectIcon.propTypes = {
  size: PropTypes.number,
  slug: PropTypes.string.isRequired,
  className: PropTypes.string
}

ProjectIcon.defaultProps = {
  size: 20,
  className: ''
}

export default connect(mapStateToProps)(ProjectIcon)
