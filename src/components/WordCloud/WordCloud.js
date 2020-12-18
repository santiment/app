import React from 'react'
import WordCloudContent from './WordCloudContent'
import { useWordCloud } from './hooks'

export const WordCloud = ({ word, from, to, size, className }) => {
  const { cloud } = useWordCloud({ size, from, to, word })

  return (
    <div className={className}>
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
