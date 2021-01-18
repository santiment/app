import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import { useTrendSocialVolume, useTrendSocialVolumeChange } from './hooks'
import { prepareColumns } from '../_Table'
import { INDEX_COLUMN } from '../_Table/columns'
import { useRenderQueueItem } from '../renderQueue/sized'
import { Skeleton } from '../../components/Skeleton'
import MiniChart from '../../components/MiniChart'
import PercentChanges from '../../components/PercentChanges'
import WordCloud from '../../components/WordCloud/WordCloud'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import styles from './index.module.scss'

const Loader = () => <Skeleton show className={styles.chart__skeleton} />

const SocialVolumeChange = ({ trend }) => {
  const { isRendered, onLoad } = useRenderQueueItem()
  const { change } = useTrendSocialVolumeChange(trend, !isRendered, onLoad)

  return change ? (
    <PercentChanges changes={change} className={styles.change__percent} />
  ) : null
}

const SocialVolumeChart = ({ trend }) => {
  const { isRendered, onLoad } = useRenderQueueItem()
  const { data, isLoading } = useTrendSocialVolume(trend, !isRendered, onLoad)

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

const Score = ({ trend }) => {
  const { isPro } = useUserSubscriptionStatus()

  return (
    <div className={styles.change}>
      {Math.round(trend.score)}
      {isPro && <SocialVolumeChange trend={trend} />}
    </div>
  )
}

const Paywall = () => (
  <Link to='/pricing' className={styles.paywall}>
    <Icon type='crown' />
    <span className={styles.upgrade}>Upgrade</span>
  </Link>
)

const TrendingChart = ({ trend }) => {
  const { loading, isPro } = useUserSubscriptionStatus()
  if (loading) return <Loader />

  return isPro ? <SocialVolumeChart trend={trend} /> : <Paywall />
}

const ConnectedWords = ({ word }) => {
  const { isRendered, onLoad } = useRenderQueueItem()

  return isRendered ? (
    <WordCloud
      className={styles.cloud__words}
      size={6}
      word={word}
      onLoad={onLoad}
    />
  ) : (
    <Loader />
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
      render: ({ word }) => (
        <Link className={styles.word} to={`/labs/trends/explore/${word}`}>
          {word}
        </Link>
      )
    },
    {
      title: Column.SOCIAL_VOLUME,
      render: trend => <Score trend={trend} />
    },
    {
      title: Column.TRENDING_CHART,
      render: trend => <TrendingChart trend={trend} />
    },
    {
      title: Column.CONNECTED_WORDS,
      className: styles.cloud,
      render: ({ word }) => <ConnectedWords word={word} />
    }
  ])
)
