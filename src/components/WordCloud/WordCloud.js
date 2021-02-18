import React from 'react'
import WordCloudContent from './WordCloudContent'
import { useWordCloud } from './hooks'
import Skeleton from '../Skeleton/Skeleton'
import styles from './WordCloud.module.scss'

export const WordCloud = ({ cloud, className, isLoading }) => (
  <div className={className}>
    {isLoading && (
      <Skeleton
        centered
        className={styles.skeleton}
        show={isLoading}
        repeat={1}
      />
    )}
    <WordCloudContent
      cloud={cloud}
      className={className}
      bigLimit={1}
      mediumLimit={3}
      padding={8}
      showBadge={false}
    />
  </div>
)

export default props => {
  const { cloud, loading } = useWordCloud(props)

  return <WordCloud {...props} cloud={cloud} isLoading={loading} />
}
