import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Skeleton } from '../../components/Skeleton'
import MiniChart from '../../components/MiniChart'
import { WordCloud } from '../../components/WordCloud/WordCloud'
import { getAverageSocialDominance, getAverageSocialVolume } from './utils'
import { useTrendSocialDominance, useTrendSocialVolume, useTrendWordContext } from './hooks'
import { INDEX_COLUMN } from '../_Table/columns'
import { prepareColumns } from '../_Table'
import styles from './columns.module.scss'

const Loader = () => <Skeleton show className={styles.skeleton} />

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

const AverageSocialVolume = ({ trend, words }) => {
  const { data: volume, isLoading: isLoadingVolume } = useTrendSocialVolume(words, trend)
  const { data: dominance, isLoading: isLoadingDominance } = useTrendSocialDominance(words, trend)

  if (isLoadingVolume || isLoadingDominance) return <Loader />

  const socialVolume = getAverageSocialVolume(volume)
  const socialDominance = getAverageSocialDominance(dominance)

  return (
    <p>
      {socialVolume} | {socialDominance}%
    </p>
  )
}

const ConnectedWords = memo(({ trend, words }) => {
  const { data, isLoading } = useTrendWordContext(words, trend)

  return (
    <WordCloud
      className={styles.words}
      textClassName='body-3'
      cloud={data}
      isLoading={isLoading}
      fixedFont={{
        fontSize: 14,
      }}
    />
  )
})

export const Column = {
  INDEX: INDEX_COLUMN.id,
  TRENDING_WORDS: 'Trending words, 24h',
  TRENDING_CHART: 'Trending chart, 7d',
  SOCIAL_VOLUME: 'Average social volume, 7d',
  CONNECTED_WORDS: 'Connected words',
}

export const COLUMNS = [INDEX_COLUMN].concat(
  prepareColumns([
    {
      title: Column.TRENDING_WORDS,
      className: styles.word,
      render: ({ word }) => (
        <Link className='btn' to={`/labs/trends/explore/${word}`}>
          {word}
        </Link>
      ),
    },
    {
      title: Column.TRENDING_CHART,
      render: (trend, { words }) => <SocialVolumeChart trend={trend} words={words} />,
    },
    {
      title: Column.SOCIAL_VOLUME,
      render: (trend, { words }) => <AverageSocialVolume trend={trend} words={words} />,
    },
    {
      title: Column.CONNECTED_WORDS,
      className: styles.cloud,
      render: (trend, { words }) => <ConnectedWords trend={trend} words={words} />,
    },
  ]),
)
