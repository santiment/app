import React from 'react'
import Settings from './Settings'
import Compare from '../Compare'
import Template from '../Template'
import styles from './index.module.scss'

export default ({ settings, ...rest }) => {
  const { slug, title } = settings

  return (
    <div className={styles.wrapper}>
      <Template {...rest} {...settings} />
      <div className={styles.divider} />
      <div className={styles.title}>{title}</div>
      {/* <Compare {...rest} slug={slug} className={styles.compare} /> */}
      <Settings
        {...rest}
        settings={settings}
        className={styles.settings}
        showMulti={false}
      />
    </div>
  )
}
