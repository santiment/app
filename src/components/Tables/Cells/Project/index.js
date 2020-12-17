import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import ProjectIcon from '../../../ProjectIcon/ProjectIcon'
import styles from './index.module.scss'

const Project = ({
  name,
  ticker,
  slug,
  logoUrl,
  darkLogoUrl,
  className,
  to
}) => (
  <Link to={to}>
    <div className={cx(styles.label, className)}>
      <ProjectIcon
        logoUrl={logoUrl}
        darkLogoUrl={darkLogoUrl}
        slug={slug}
        size={20}
      />
      <span className={styles.name}>{name}</span>
      <span className={styles.ticker}>{ticker}</span>
    </div>
  </Link>
)

Project.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Project
