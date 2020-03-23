import React from 'react'
import { Helmet } from 'react-helmet'
import cx from 'classnames'
import Selector from '@santiment-network/ui/Selector/Selector'
import TrendsExploreSearch from '../../components/Trends/Explore/TrendsExploreSearch'
import Trends from '../../components/Trends/Trends'
import WordCloud from './../../components/WordCloud/WordCloud'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { safeDecode } from '../../utils/utils'
import { addRecentTrends } from '../../utils/recent'
import styles from './index.module.scss'

const TrendsExplore = ({ match = { params: {} }, history, isDesktop }) => {
  const word = match.params.word
  addRecentTrends(word)
  const topic = safeDecode(word)

  const pageTitle = `Crypto Social Trends for ${topic} - Sanbase`
  const pageDescription =
    'Explore the social volume of ANY word (or phrase) on crypto social media, including 100s of Telegram groups, crypto subreddits, discord channels, trader chats and more.'

  return (
    <div className={cx('page', styles.wrapper)}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
      </Helmet>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.search}>
            {isDesktop && (
              <TrendsExploreSearch
                topic={topic}
                isDesktop={isDesktop}
                history={history}
              />
            )}
          </div>
          {/* <SocialTool settings={{ text: topic }} /> */}
        </div>
        <div className={styles.sidebar}>
          <WordCloud className={styles.cloud} word={topic} />
          <Trends className={styles.trends} isCompactView />
        </div>
      </div>
    </div>
  )
}

export default TrendsExplore
