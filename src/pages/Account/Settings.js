import React from 'react'
import cx from 'classnames'
import { PanelWithHeader as Panel } from '@santiment-network/ui'
import styles from './AccountPage.module.scss'

const Settings = props => (
  <Panel
    {...props}
    className={cx(styles.settings, props.className)}
    headerClassName={styles.settings__header}
    contentClassName={styles.settings__content}
  />
)

Settings.Row = props => <div className={styles.setting} {...props} />

export default Settings
