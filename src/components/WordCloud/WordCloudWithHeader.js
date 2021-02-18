import React from 'react'
import HelpPopup from './../../components/HelpPopup/HelpPopup'
import WidgetTrend from '../Widget/WidgetTrend'
import { SOCIAL_CONTEXT_DESCRIPTION } from '../../ducks/dataHub/metrics/descriptions'
import WordCloudContent from './WordCloudContent'
import { useWordCloud } from './hooks'
import styles from './WordCloud.module.scss'
import stylesTooltip from '../../components/HelpPopup/HelpPopup.module.scss'

export const WordCloudWithHeader = ({
  word,
  className = '',
  showDescription = true,
  classes,
  ...rest
}) => {
  const { from, to, size } = rest
  const { cloud, loading, error } = useWordCloud({ size, from, to, word })

  return (
    <WidgetTrend
      className={className}
      trendWord={word}
      description={
        <>
          <span className={styles.heading}>Social context</span>
          <HelpPopup>
            <h4 className={stylesTooltip.title}>Social context</h4>
            {SOCIAL_CONTEXT_DESCRIPTION}
          </HelpPopup>
        </>
      }
      isLoading={loading}
      error={error}
      hasData={cloud.length > 0}
      {...rest}
    >
      <WordCloudContent cloud={cloud} />
    </WidgetTrend>
  )
}

export default WordCloudWithHeader
