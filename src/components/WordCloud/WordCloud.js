import React from 'react'
import WordCloudContent from './WordCloudContent'
import { useWordCloud } from './hooks'
import Skeleton from '../Skeleton/Skeleton'
import styles from './WordCloud.module.scss'

export const WordCloud = ({ word, from, to, size, className, onLoad }) => {
  const { cloud, loading } = useWordCloud({ size, from, to, word, onLoad })

  return (
    <div className={className}>
      {loading && (
        <Skeleton
          centered
          className={styles.skeleton}
          show={loading}
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
}

export default WordCloud
