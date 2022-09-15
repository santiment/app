import React from 'react'
import { Link } from 'react-router-dom'
import { Skeleton } from '../../../../../../../components/Skeleton'
import MiniChart from '../../../../../../../components/MiniChart'
import { WordCloud } from '../../../../../../../components/WordCloud/WordCloud'
import { useTrendSocialVolume, useTrendWordContext } from '../../../../../../../ducks/TrendsTable/hooks'
import { INDEX_COLUMN } from '../../../../../../../ducks/_Table/columns'
import { prepareColumns } from '../../../../../../../ducks/_Table'
import styles from '../../../../../../../ducks/TrendsTable/index.module.scss'

const Loader = () => <Skeleton show className={styles.chart__skeleton} />

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

const ConnectedWords = ({ trend, words }) => {
  const { data, isLoading } = useTrendWordContext(words, trend)

  return <WordCloud className={styles.cloud__words} cloud={data} isLoading={isLoading} />
}

export const Column = {
  INDEX: INDEX_COLUMN.id,
  SOCIAL_VOLUME: 'Soc. vol., 24h',
  TRENDING_CHART: 'Trending chart, 7d',
  CONNECTED_WORDS: 'Connected words',
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
      ),
    },
    {
      title: Column.TRENDING_CHART,
      render: (trend, { words }) => <SocialVolumeChart trend={trend} words={words} />,
    },
    {
      title: Column.CONNECTED_WORDS,
      className: styles.cloud,
      render: (trend, { words }) => <ConnectedWords trend={trend} words={words} />,
    },
  ]),
)
