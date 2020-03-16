import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import ProjectIcon from './ProjectIcon/ProjectIcon'
import styles from './ProjectLabel.module.scss'

const ProjectLabel = ({
  name,
  ticker,
  slug,
  logoUrl,
  darkLogoUrl,
  className
}) => (
  <div className={cx(styles.label, className)}>
    <ProjectIcon
      logoUrl={logoUrl}
      darkLogoUrl={darkLogoUrl}
      slug={slug}
      size={20}
    />
    <span className={styles.name}>{name}</span>
    <span className={styles.ticker}>({ticker})</span>
  </div>
)

ProjectLabel.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default ProjectLabel
