import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import Icon from '@santiment-network/ui/Icon'
import * as actions from '../../components/Trends/actions'
import SocialTool from '../SocialTool'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import Suggestions from '../../components/Trends/Search/Suggestions'
import NoDataTemplate from '../../components/NoDataTemplate'
import { checkHasPremium } from '../UserSelectors'
import { safeDecode, updateHistory } from '../../utils/utils'
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
  topic,
  addedTopics,
  history,
  fetchAllTickersSlugs,
  isDesktop,
  hasPremium,
  data: { wordContext: wordData = [], loading, error } = {},
  allAssets
}) => {
  const [topics, setTopics] = useState([topic, ...addedTopics])
  const [linkedAssets, setLinkedAssets] = useState(new Map())

  useEffect(() => {
    setTopics([topic, ...addedTopics])

    if (topic !== topics[0]) {
      trackTopicSearch(topic)
    }

  }, [topic, addedTopics])

  useEffect(() => {
    const newLinkedAssets = new Map()
    topics.forEach(topic => {
      addRecentTrends(topic)
      newLinkedAssets.set(
        topic,
        detectWordWithAllTickersSlugs({ word: topic, allAssets })
      )
    })

    setLinkedAssets(newLinkedAssets)
  }, [topics])

  if (allAssets.length === 0) {
    fetchAllTickersSlugs()
  }

  function updTopics (newTopics) {
    if (newTopics !== topics) {
      const { origin } = window.location
      const addedTopics = newTopics.slice(1)
      const newOptions = updTopicsInUrl(addedTopics)
      const pathname = `/labs/trends/explore/${encodeURIComponent(
        newTopics[0]
      )}?`

      if (newTopics.length !== 0) {
        trackTopicSearch(newTopics.join(','))
      }

      updateHistory(origin + pathname + newOptions)
      setTopics(newTopics)
    }
  }

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
            onChangeTopics={updTopics}
            isDesktop={isDesktop}
          />
          {isDesktop && <Suggestions />}
          {topic ? (
            <SocialTool
              settings={{ slug: topics[0], addedTopics: topics.slice(1) }}
            />
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
