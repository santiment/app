import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import Icon from '@santiment-network/ui/Icon'
import * as actions from '../../components/Trends/actions'
import SocialTool from '../SocialTool'
import TrendsExploreSearch from '../../components/Trends/Explore/TrendsExploreSearch'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import withDetectionAsset from '../../components/Trends/withDetectionAsset'
import { TrendsSamples } from '../../components/Trends/TrendsSearch'
import NoDataTemplate from '../../components/NoDataTemplate'
import { WORD_CLOUD_QUERY } from '../../components/WordCloud/wordCloudGQL'
import { checkHasPremium } from '../UserSelectors'
import { safeDecode } from '../../utils/utils'
import { getTimeIntervalFromToday } from '../../utils/dates'
import { addRecentTrends } from '../../utils/recent'
import Sidebar from './Sidebar'
import styles from './index.module.scss'

const pageDescription =
  'Explore the social volume of ANY word (or phrase) on crypto social media, including 100s of Telegram groups, crypto subreddits, discord channels, trader chats and more.'

const TrendsExplore = ({
  word,
  history,
  detectedAsset,
  fetchAllTickersSlugs,
  fetchTrendSocialData,
  isDesktop,
  hasPremium,
  data: { wordContext: wordData = [], loading, error } = {},
  allAssets
}) => {
  const [isNoData, setIsNoData] = useState(false)

  const noData = (wordData.length === 0 && !loading) || error

  if (noData !== isNoData) {
    setIsNoData(noData)
  }

  if (allAssets.length === 0) {
    fetchAllTickersSlugs()
  }

  addRecentTrends(word)
  fetchTrendSocialData(word)

  const topic = safeDecode(word)
  const pageTitle = `Crypto Social Trends for ${topic} - Sanbase`

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
      </Helmet>
      <div className={styles.layout}>
        <div className={styles.main}>
          {isDesktop && (
            <div className={styles.breadcrumbs}>
              <Link to='/labs/trends/' className={styles.link}>
                Emerging trends
              </Link>
              <Icon type='arrow-right' className={styles.arrow} />
              Social context
            </div>
          )}
          <div className={styles.search}>
            {isDesktop ? (
              <TrendsExploreSearch
                topic={topic}
                isDesktop={isDesktop}
                history={history}
                className={styles.search}
              />
            ) : (
              <MobileHeader
                goBack={history.goBack}
                backRoute={'/'}
                classes={{
                  wrapper: styles.wrapperHeader,
                  searchBtn: styles.fullSearchBtn
                }}
                title=''
              >
                <TrendsExploreSearch
                  className={styles.search}
                  topic={topic}
                  isDesktop={isDesktop}
                />
              </MobileHeader>
            )}
            <TrendsSamples />
          </div>
          {topic && !isNoData ? (
            <SocialTool
              settings={{ slug: detectedAsset ? detectedAsset.slug : topic }}
              detectedAsset={detectedAsset}
            />
          ) : (
            <NoDataTemplate />
          )}
        </div>
        <Sidebar
          detectedAsset={detectedAsset}
          topic={topic}
          hasPremium={hasPremium}
          isNoData={isNoData}
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  allAssets: state.hypedTrends.allAssets,
  hasPremium: checkHasPremium(state)
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
  withDetectionAsset,
  graphql(WORD_CLOUD_QUERY, {
    skip: ({ word }) => !word,
    options: ({ word }) => {
      const { from, to } = getTimeIntervalFromToday(-1, 'd')
      const fromIso = from.toISOString()
      const toIso = to.toISOString()

      return {
        variables: {
          from: fromIso,
          to: toIso,
          size: 1,
          word: safeDecode(word)
        }
      }
    }
  })
)(TrendsExplore)
