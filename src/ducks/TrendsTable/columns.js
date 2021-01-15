import React from 'react'
import { Link } from 'react-router-dom'
import { useTrendSocialVolume, useTrendSocialVolumeChange } from './hooks'
import { prepareColumns } from '../_Table'
import { INDEX_COLUMN } from '../_Table/columns'
import PercentChanges from '../../components/PercentChanges'
import MiniChart from '../../components/MiniChart'
import WordCloud from '../../components/WordCloud/WordCloud'
import { Skeleton } from '../../components/Skeleton'
import styles from './index.module.scss'

const SocialVolumeChange = ({ trend }) => {
  const { value, change } = useTrendSocialVolumeChange(trend)

  return (
    <div className={styles.change}>
      {value}
      {change && (
        <PercentChanges changes={change} className={styles.change__percent} />
      )}
    </div>
  )
}

const SocialVolumeChart = ({ trend }) => {
  const { data, isLoading } = useTrendSocialVolume(trend)

  return isLoading ? (
    <Skeleton show className={styles.chart__skeleton} />
  ) : (
    <MiniChart
      className={styles.chart}
      height={45}
      width={120}
      data={data}
      valueKey='value'
      gradientId='trend-social-volume'
      gradientColor='malibu'
      gradientOpacity='0.7'
    />
  )
}

export const COLUMNS = [INDEX_COLUMN].concat(
  prepareColumns([
    {
      title: 'Trending word',
      render: ({ word }) => (
        <Link className={styles.word} to={`/labs/trends/explore/${word}`}>
          {word}
        </Link>
      )
    },
    {
      title: 'Soc. vol., 24h',
      render: trend => <SocialVolumeChange trend={trend} />
    },
    {
      title: 'Trending chart, 7d',
      render: trend => <SocialVolumeChart trend={trend} />
    },
    {
      title: 'Connected words',
      className: styles.cloud,
      render: ({ word }) => (
        <WordCloud className={styles.cloud__words} size={6} word={word} />
      )
    }
  ])
)
