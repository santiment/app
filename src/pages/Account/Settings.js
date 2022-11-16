import React from 'react'
import cx from 'classnames'
import { PanelWithHeader as Panel } from '@santiment-network/ui'
import styles from './AccountPage.module.scss'

const Settings = ({id, ...props}) => (
  <div className='relative fluid'>
    <div id={id} className={styles.virtualDiv} />
    <Panel
      {...props}
      className={cx(styles.settings, props.className)}
      headerClassName={styles.settings__header}
      contentClassName={cx(styles.settings__content, props.contentClassName)}
    />
  </div>
)

Settings.Row = (props) => <div className={cx(styles.setting, props.className)} {...props} />

export default Settings
