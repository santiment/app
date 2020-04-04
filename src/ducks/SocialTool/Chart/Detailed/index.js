import React, { useState } from 'react'
import cx from 'classnames'
import Trigger from './Trigger'
import styles from './index.module.scss'

const Chart = {
  social_volume_telegram: {
    color: '#5275FF',
    label: 'Telegram'
  },
  social_volume_reddit: {
    color: '#FF5B5B',
    label: 'Reddit'
  },
  social_volume_professional_traders_chat: {
    color: '#F0BB35',
    label: 'Professional traders chat'
  },
  social_volume_discord: {
    color: '#8358FF',
    label: 'Discord'
  },
  community_messages_count_telegram: {
    color: '#5275FF',
    label: 'Telegram'
  }
}

Object.keys(Chart).forEach(key => {
  Chart[key].key = key
})

const GENERAL_CHARTS = [
  Chart.social_volume_telegram,
  Chart.social_volume_reddit,
  Chart.social_volume_professional_traders_chat,
  Chart.social_volume_discord
]

const COMMUNITY_MESSAGES_CHARTS = [Chart.community_messages_count_telegram]

const DetailedBlock = ({ setSettings, settings, ...props }) => {
  const defaultCharts = settings.detailed_charts.map(key => Chart[key])

  const [activeCharts, setActiveCharts] = useState(new Set(defaultCharts))

  function toggleChart (chart) {
    const newActiveCharts = new Set(activeCharts)
    if (!newActiveCharts.delete(chart)) {
      newActiveCharts.add(chart)
    }

    const activeKeys = [...newActiveCharts].map(({ key }) => key)
    setActiveCharts(newActiveCharts)
    setSettings(state => ({
      ...state,
      detailed_charts: activeKeys
    }))
  }

  return (
    <>
      <div className={styles.row}>
        <h3 className={styles.heading}>General charts</h3>
        {GENERAL_CHARTS.map((chart, idx) => (
          <Trigger
            key={idx}
            isActive={activeCharts.has(chart)}
            className={styles.button}
            {...chart}
            toggleActive={() => toggleChart(chart)}
          />
        ))}
      </div>
      <div className={styles.row}>
        <h3 className={styles.heading}>Community messages charts</h3>
        {COMMUNITY_MESSAGES_CHARTS.map((chart, idx) => (
          <Trigger
            key={idx}
            isActive={activeCharts.has(chart)}
            className={styles.button}
            {...chart}
            toggleActive={() => toggleChart(chart)}
          />
        ))}
      </div>
    </>
  )
}

export default DetailedBlock
