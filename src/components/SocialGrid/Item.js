import React from 'react'
import { Link } from 'react-router-dom'
import { Metric } from '../../ducks/dataHub/metrics'
import Chart from './Chart'
import styles from './Item.module.scss'

const Item = ({ topic, onTopicClick, settings }) => {
  const charts = [Metric.social_volume_total]
  let MetricSettingMap = new Map()

  MetricSettingMap.set(Metric.social_volume_total, {
    selector: 'text',
    slug: topic
  })

  return (
    <article className={styles.wrapper}>
      <Link to={`/labs/trends/explore/${topic}`} className={styles.text}>
        {topic}
      </Link>
      <Chart
        topic={topic}
        charts={charts}
        settingMap={MetricSettingMap}
        settings={settings}
        className={styles.chart}
      />
    </article>
  )
}

export default Item
