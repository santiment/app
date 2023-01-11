import React from 'react'
import cx from 'classnames'
import { PanelWithHeader as Panel } from '@santiment-network/ui'
import styles from './AccountPage.module.scss'

const Settings = (props) => (
  <Panel
    {...props}
    className={cx(styles.settings, props.className)}
    headerClassName={cx(styles.settings__header, 'txt-m body-3')}
    contentClassName={cx(styles.settings__content, props.contentClassName)}
  />
)

Settings.Row = (props) => <div className={cx(styles.setting, props.className)} {...props} />

export default Settings
