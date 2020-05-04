import React from 'react'
import Settings from './Settings'
import Compare from '../Compare'
import Template from '../Template'
import styles from './index.module.scss'
import { saveToggle } from '../../../utils/localStorage'

export default ({ settings, ...rest }) => {
  const { slug, title } = settings

  const { setOptions } = rest

  function toggleMultiCharts (forceValue) {
    setOptions(state => {
      return {
        ...state,
        isMultiChartsActive: saveToggle(
          'isMultiChartsActive',
          typeof forceValue === 'boolean'
            ? forceValue
            : !state.isMultiChartsActive
        )
      }
    })
  }

  return (
    <div className={styles.wrapper}>
      <Template {...rest} {...settings} toggleMultiCharts={toggleMultiCharts} />
      <div className={styles.divider} />
      <div className={styles.title}>{title}</div>
      <Compare {...rest} slug={slug} className={styles.compare} />
      <Settings
        {...rest}
        settings={settings}
        className={styles.settings}
        toggleMultiCharts={toggleMultiCharts}
      />
    </div>
  )
}
