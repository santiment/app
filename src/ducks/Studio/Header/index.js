import React from 'react'
import Settings from './Settings'
import Template from '../Template'
import styles from './index.module.scss'

export default props => {
  return (
    <div className={styles.wrapper}>
      <Template {...props} {...props.settings} />
      <div className={styles.divider} />
      <div className={styles.title}>{props.settings.title}</div>
      <Settings {...props} className={styles.settings} showMulti={false} />
    </div>
  )
}
