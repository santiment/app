import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import Icon from '@santiment-network/ui/Icon'
import { useTheme } from '@/stores/ui/theme'
import { PREDEFINED_ICONS } from './savedIcons'
import { PROJECT_ICON_QUERY } from './IconGQL.js'
import styles from './ProjectIcon.module.scss'

export const ProjectIcon = ({
  slug,
  logoUrl,
  darkLogoUrl,
  size,
  data: { project } = {},
  className,
}) => {
  const isNightMode = useTheme().nightMode

  let { logoUrl: logo, darkLogoUrl: darkLogo } = PREDEFINED_ICONS[slug] || {}

  if (!logo || !darkLogo) {
    if (logoUrl) {
      logo = logoUrl
      darkLogo = darkLogoUrl || logoUrl
    }

    if (project && project.slug === slug) {
      logo = project.logoUrl
      darkLogo = project.darkLogoUrl || project.logoUrl
    }
  }

  if (isNightMode) {
    logo = darkLogo || logo
  }

  return logo ? (
    <img src={logo} width={size} height={size} className={cx(styles.logo, className)} alt={slug} />
  ) : (
    <div
      className={cx(styles.default, className)}
      style={{
        '--size': `${size}px`,
        '--fill': isNightMode ? '#7a859e' : 'var(--casper)',
        '--background': isNightMode ? 'var(--mystic)' : 'var(--porcelain)',
      }}
    >
      <Icon type={size > 20 ? 'assets' : 'asset-small'} />
    </div>
  )
}

ProjectIcon.propTypes = {
  size: PropTypes.number,
  slug: PropTypes.string,
  className: PropTypes.string,
}

ProjectIcon.defaultProps = {
  size: 20,
  className: '',
}

export default compose(
  graphql(PROJECT_ICON_QUERY, {
    skip: ({ logoUrl, slug }) => !!logoUrl || !!PREDEFINED_ICONS[slug] || !slug,
  }),
)(ProjectIcon)
