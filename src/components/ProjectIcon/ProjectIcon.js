import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import Icon from '@santiment-network/ui/Icon'
import { PREDEFINED_ICONS } from './savedIcons'
import { PROJECT_ICON_QUERY } from './IconGQL.js'
import styles from './ProjectIcon.module.scss'

export const ProjectIcon = ({
  slug,
  logoUrl,
  darkLogoUrl,
  size,
  isNightMode,
  data: { project } = {},
  className
}) => {
  if (!PREDEFINED_ICONS[slug]) {
    if (logoUrl) {
      PREDEFINED_ICONS[slug] = { logoUrl, darkLogoUrl: darkLogoUrl || logoUrl }
    }

    if (project) {
      PREDEFINED_ICONS[slug] = { ...project }
    }
  }

  const { logoUrl: logo, darkLogoUrl: darkLogo } = PREDEFINED_ICONS[slug] || {}
  const icon = isNightMode ? darkLogo : logo

  return icon ? (
    <img
      src={icon}
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

const mapStateToProps = ({ rootUi: { isNightModeEnabled: isNightMode } }) => ({
  isNightMode
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

export default compose(
  connect(mapStateToProps),
  graphql(PROJECT_ICON_QUERY, {
    skip: ({ logoUrl, slug }) => !!logoUrl || !!PREDEFINED_ICONS[slug]
  })
)(ProjectIcon)
