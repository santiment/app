import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { compose, withProps } from 'recompose'
import Icon from '@santiment-network/ui/Icon'
import * as actions from '../../components/Trends/actions'
import SocialTool from '../SocialTool'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import withDetectionAsset from '../../components/Trends/withDetectionAsset'
import Suggestions from '../../components/Trends/Search/Suggestions'
import NoDataTemplate from '../../components/NoDataTemplate'
import { checkHasPremium } from '../UserSelectors'
import { safeDecode } from '../../utils/utils'
import { addRecentTrends } from '../../utils/recent'
import { trackTopicSearch } from '../../components/Trends/Search/utils'
import { getTopicsFromUrl, updTopicsInUrl } from './url'
import { detectWordWithAllTickersSlugs } from './utils'
import Search from './Search'
import Sidebar from './Sidebar'
import styles from './index.module.scss'

const pageDescription =
  'Explore the social volume of ANY word (or phrase) on crypto social media, including 100s of Telegram groups, crypto subreddits, discord channels, trader chats and more.'

const TrendsExplore = ({
  word,
  addedTopics,
  history,
  fetchAllTickersSlugs,
  fetchTrendSocialData,
  isDesktop,
  hasPremium,
  gotoExplore,
  data: { wordContext: wordData = [], loading, error } = {},
  allAssets
}) => {
  const topic = safeDecode(word)
  const [topics, setTopics] = useState([topic, ...addedTopics])
  const [linkedAssets, setLinkedAssets] = useState(new Map())

  useEffect(() => {
    console.log(topic, addedTopics)
  }, [topic])

  if (allAssets.length === 0) {
    fetchAllTickersSlugs()
  } else if (linkedAssets.size === 0) {
    const newLinkedAssets = new Map()
    topics.forEach(topic => {
      newLinkedAssets.set(
        topic,
        detectWordWithAllTickersSlugs({ word: topic, allAssets })
      )
    })

    setLinkedAssets(newLinkedAssets)
  }

  function updTopics (newTopics) {
    console.log('UPD')
    if (newTopics !== topics) {
      setTopics(newTopics)
      gotoExplore(newTopics)
    }
  }

  addRecentTrends(word)
  fetchTrendSocialData(word)

  const pageTitle = `Crypto Social Trends for ${topic} - Sanbase`

  return (
    <div className={styles.wrapper}>
      <Helmet
        title={pageTitle}
        meta={[
          { property: 'og:title', content: pageTitle },
          { property: 'og:description', content: pageDescription }
        ]}
      />
      <div className={styles.layout}>
        <div className={styles.main}>
          {isDesktop ? (
            <div className={styles.breadcrumbs}>
              <Link to='/labs/trends/' className={styles.link}>
                Emerging trends
              </Link>
              <Icon type='arrow-right' className={styles.arrow} />
              Social context
            </div>
          ) : (
            <MobileHeader
              goBack={history.goBack}
              backRoute={'/'}
              classes={{
                wrapper: styles.mobileHeader,
                left: styles.mobileHeader__left,
                searchBtn: styles.mobileHeader__search
              }}
              title='Social context'
            />
          )}
          <Search
            topics={topics}
            linkedAssets={linkedAssets}
            isDesktop={isDesktop}
          />
          {isDesktop && <Suggestions />}
          {topic ? (
            <SocialTool settings={{ slug: topic, addedTopics }} />
          ) : (
            <NoDataTemplate />
          )}
        </div>
        <Sidebar
          topics={topics}
          linkedAssets={linkedAssets}
          hasPremium={hasPremium}
          isDesktop={isDesktop}
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
  },
  gotoExplore: topics => {
    const addedTopics = topics.slice(1)
    const newOptions = updTopicsInUrl(addedTopics)
    trackTopicSearch(topics[0])
    dispatch(
      push(
        `/labs/trends/explore/${encodeURIComponent(topics[0])}?${newOptions}`
      )
    )
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(({ match = { params: {} }, ...rest }) => {
    const addedTopics = getTopicsFromUrl()
    const word = match.params.word
    return {
      word,
      topic: safeDecode(word),
      addedTopics,
      ...rest
    }
  })
)(TrendsExplore)
