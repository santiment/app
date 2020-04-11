import React from 'react'
import Settings from './Settings'
import Compare from '../Compare'
import Template from '../Template'
import styles from './index.module.scss'

export default ({ settings, ...rest }) => {
  const { slug, title } = settings
  return (
    <div className={styles.wrapper}>
      <Template activeMetrics={rest.activeMetrics} {...settings} />
      <div className={styles.title}>
        <span className={styles.slug}>{title}</span>
      </div>
      <Compare {...rest} slug={slug} className={styles.compare} />
      <Settings {...rest} settings={settings} className={styles.settings} />
    </div>
  )
}
