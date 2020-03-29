import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import cx from 'classnames'
import SocialTool from '../../ducks/SocialTool'
import AverageSocialVolume from '../../components/AverageSocialVolume'
import TrendsExploreSearch from '../../components/Trends/Explore/TrendsExploreSearch'
import * as actions from '../../components/Trends/actions'
import withDetectionAsset from '../../components/Trends/withDetectionAsset'
import Trends from '../../components/Trends/Trends'
import WordCloud from './../../components/WordCloud/WordCloud'
import { safeDecode } from '../../utils/utils'
import { addRecentTrends } from '../../utils/recent'
import styles from './index.module.scss'

const TrendsExplore = ({
  word: newWord,
  history,
  detectedAsset,
  fetchAllTickersSlugs,
  fetchTrendSocialData,
  isDesktop,
  allAssets
}) => {
  if (allAssets.length === 0) {
    fetchAllTickersSlugs()
  }

  const [word, setWord] = useState()
  if (word !== newWord && newWord) {
    addRecentTrends(newWord)
    fetchTrendSocialData(newWord)
    setWord(newWord)
  }

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
          <SocialTool
            settings={{ text: topic }}
            detectedAsset={detectedAsset}
          />
        </div>
        <div className={styles.sidebar}>
          <AverageSocialVolume text={topic} detectedAsset={detectedAsset} />
          <WordCloud
            className={styles.cloud}
            infoClassName={styles.cloud__header}
            word={topic}
          />
          <Trends className={styles.trends} isCompactView />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  allAssets: state.hypedTrends.allAssets
})

const mapDispatchToProps = dispatch => ({
  fetchAllTickersSlugs: () => {
    dispatch({
      type: actions.TRENDS_HYPED_FETCH_TICKERS_SLUGS
    })
  },
  fetchTrendSocialData: payload => {
    dispatch({
      type: actions.TRENDS_HYPED_WORD_SELECTED,
      payload
    })
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(({ match = { params: {} }, ...rest }) => {
    return {
      word: match.params.word,
      ...rest
    }
  }),
  withDetectionAsset
)(TrendsExplore)
