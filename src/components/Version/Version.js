import React from 'react'
import cx from 'classnames'
import styles from './Version.module.scss'

export const VersionLabel = ({ className }) => (
  <span className={className}>{process.env.REACT_APP_VERSION}</span>
)

const Version = ({ classes = {} }) => {
  return (
    <div className={styles.wrapper}>
      <span className={cx(styles.versionDivider, classes.footerVersionDivider)}>
        |
      </span>
      <span className={cx(styles.version, classes.version)}>
        Ver. <VersionLabel />
      </span>
    </div>
  )
}

export default Version
