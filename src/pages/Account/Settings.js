import React from 'react'
import cx from 'classnames'
import { PanelWithHeader as Panel } from '@santiment-network/ui'
import styles from './AccountPage.module.scss'

const Settings = props => (
  <Panel
    {...props}
    className={cx(styles.settings, props.className)}
    headerClassName={styles.settings__header}
    contentClassName={cx(styles.settings__content, props.contentClassName)}
  />
)

Settings.Row = props => (
  <div className={cx(styles.setting, props.className)} {...props} />
)

export default Settings
