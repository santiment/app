import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import PropTypes from 'prop-types'
import Icon from '@santiment-network/ui/Icon'
import { SAVE_PROJECT_ICON } from '../../actions/types'
import styles from './ProjectIcon.module.scss'

export const ProjectIcon = ({
  slug,
  logoUrl,
  darkLogoUrl,
  size,
  isNightMode,
  icons,
  addIcon,
  className
}) => {
  const icon = icons[slug] || {}
  const darkLogo = darkLogoUrl || icon.darkLogoUrl || logoUrl || icon.logoUrl
  const logo = isNightMode ? darkLogo : logoUrl || icon.logoUrl

  return logo ? (
    <img
      src={logo}
      width={size}
      height={size}
      className={cx(styles.logo, className)}
      alt={slug}
    />
  ) : (
    <div
      className={cx(styles.default, className)}
      style={{
        '--size': `${size}px`,
        '--fill': isNightMode ? '#7a859e' : 'var(--casper)',
        '--background': isNightMode ? 'var(--mystic)' : 'var(--porcelain)'
      }}
    >
      <Icon type={size > 20 ? 'assets' : 'asset-small'} />
    </div>
  )
}

const mapStateToProps = ({
  rootUi: { isNightModeEnabled: isNightMode },
  projects: { icons }
}) => ({ isNightMode, icons })

const mapDispatchToProps = dispatch => ({
  addIcon: payload => dispatch({ type: SAVE_PROJECT_ICON, payload })
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectIcon)
