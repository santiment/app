import React from 'react'
import { Link } from 'react-router-dom'
import {
  useTrendWordContext,
  useTrendSocialVolume,
  useTrendSocialVolumeChange
} from './hooks'
import { prepareColumns } from '../_Table'
import { INDEX_COLUMN } from '../_Table/columns'
import { Skeleton } from '../../components/Skeleton'
import MiniChart from '../../components/MiniChart'
import PercentChanges from '../../components/PercentChanges'
import { WordCloud } from '../../components/WordCloud/WordCloud'
import styles from './index.module.scss'

const Loader = () => <Skeleton show className={styles.chart__skeleton} />

const SocialVolumeScore = ({ value, change }) => (
  <>
    {value}
    <PercentChanges changes={change} className={styles.change__percent} />
  </>
)

const SocialVolumeChart = ({ trend, words }) => {
  const { data, isLoading } = useTrendSocialVolume(words, trend)

  return isLoading ? (
    <Loader />
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

const SocialVolume = ({ trend, words }) => {
  const { value, change } = useTrendSocialVolumeChange(words, trend)

  return (
    <div className={styles.change}>
      {value ? <SocialVolumeScore value={value} change={change} /> : <Loader />}
    </div>
  )
}

const ConnectedWords = ({ trend, words }) => {
  const { data, isLoading } = useTrendWordContext(words, trend)

  return (
    <WordCloud
      className={styles.cloud__words}
      cloud={data}
      isLoading={isLoading}
    />
  )
}

export const Column = {
  INDEX: INDEX_COLUMN.id,
  SOCIAL_VOLUME: 'Soc. vol., 24h',
  TRENDING_CHART: 'Trending chart, 7d',
  CONNECTED_WORDS: 'Connected words'
}

export const COLUMNS = [INDEX_COLUMN].concat(
  prepareColumns([
    {
      title: 'Trending word',
      className: styles.word,
      render: ({ word }) => (
        <Link className={styles.word__link} to={`/labs/trends/explore/${word}`}>
          {word}
        </Link>
      )
    },
    {
      title: Column.SOCIAL_VOLUME,
      render: (trend, { words }) => <SocialVolume trend={trend} words={words} />
    },
    {
      title: Column.TRENDING_CHART,
      render: (trend, { words }) => (
        <SocialVolumeChart trend={trend} words={words} />
      )
    },
    {
      title: Column.CONNECTED_WORDS,
      className: styles.cloud,
      render: (trend, { words }) => (
        <ConnectedWords trend={trend} words={words} />
      )
    }
  ])
)
