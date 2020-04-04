import React, { useState } from 'react'
import cx from 'classnames'
import Trigger from './Trigger'
import styles from './index.module.scss'

const Charts = {
  telegram: {
    key: 'social_volume_telegram',
    color: '#5275FF',
    label: 'Telegram'
  },
  reddit: {
    key: 'social_volume_reddit',
    color: '#FF5B5B',
    label: 'Reddit'
  },
  traders_chat: {
    key: 'social_volume_professional_traders_chat',
    color: '#F0BB35',
    label: 'Professional traders chat'
  },
  discord: {
    key: 'social_volume_discord',
    color: '#8358FF',
    label: 'Discord'
  },
  messages_telegram: {
    key: 'community_messages_count_telegram',
    color: '#5275FF',
    label: 'Telegram'
  }
}

const GENERAL_CHARTS = [
  Charts.telegram,
  Charts.reddit,
  Charts.traders_chat,
  Charts.discord
]

const COMMUNITY_MESSAGES_CHARTS = [Charts.messages_telegram]

const DetailedBlock = ({ ...props }) => {
  const active = new Set().add(Charts.telegram)
  const [activeCharts, setActiveCharts] = useState(active)

  function toggleChart (chart) {
    const newActiveCharts = new Set(activeCharts)
    if (!newActiveCharts.delete(chart)) {
      newActiveCharts.add(chart)
    }

    setActiveCharts(newActiveCharts)
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
