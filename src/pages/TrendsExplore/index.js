import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { track } from 'webkit/analytics'
import Icon from '@santiment-network/ui/Icon'
import SocialTool from '../SocialTool'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import Suggestions from '../../components/Trends/Search/Suggestions'
import { safeDecode, updateHistory } from '../../utils/utils'
import { addRecentTrends } from '../../utils/recent'
import { trackTopicSearch } from '../../components/Trends/Search/utils'
import SocialGrid from '../../components/SocialGrid'
import { getTopicsFromUrl, updTopicsInUrl } from './url'
import Search from './Search'
import Sidebar from './Sidebar'
import { useProjects, getProjectInfo } from '../../stores/projects'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import styles from './index.module.scss'

const EMPTY_MAP = new Map()

const pageDescription =
  'Explore the social volume of ANY word (or phrase) on crypto social media, including 100s of Telegram groups, crypto subreddits, trader chats and more.'

const TrendsExplore = ({ topic, addedTopics, isDesktop }) => {
  const { projects } = useProjects()
  const { isPro: hasPremium } = useUserSubscriptionStatus()
  const [topics, setTopics] = useState([topic, ...addedTopics].filter(Boolean))
  const [activeLinkedAssets, setActiveLinkedAssets] = useState(EMPTY_MAP)
  const linkedAssets = useMemo(() => {
    if (projects.length === 0) return EMPTY_MAP

    const newLinkedAssets = new Map()
    topics.forEach((topic) => newLinkedAssets.set(topic, getProjectInfo(projects, topic, topic)))
    return newLinkedAssets
  }, [topics, projects])

  useEffect(() => {
    track.pageview('sanbase')
  }, [topic])
  useEffect(() => topics.forEach(addRecentTrends), [topics])
  useEffect(() => {
    if (topic !== '') {
      setTopics([topic, ...addedTopics])

      if (topic !== topics[0]) {
        trackTopicSearch(topic)
      }
    }
  }, [topic, addedTopics])

  function updTopics(newTopics) {
    if (newTopics !== topics) {
      const { origin } = window.location
      const addedTopics = newTopics.slice(1)
      const newOptions = updTopicsInUrl(addedTopics)
      const pathname = `/labs/trends/explore/${
        newTopics[0] ? encodeURIComponent(newTopics[0]) : ''
      }?${newOptions}`

      if (newTopics.length !== 0) {
        trackTopicSearch(newTopics.join(','))
      }

      updateHistory(origin + pathname)
      setTopics(newTopics)
    }
  }

  const pageTitle = `Crypto Social Trends for ${topic} - Sanbase`

  const isEmptySearch = !topics[0]

  return (
    <div className={styles.wrapper}>
      <Helmet
        title={pageTitle}
        meta={[
          { property: 'og:title', content: pageTitle },
          { property: 'og:description', content: pageDescription },
        ]}
      />
      <div className={styles.layout}>
        <div className={styles.main}>
          {isDesktop ? (
            <div className={styles.breadcrumbs}>
              <Link to='/dashboards' className={styles.link}>
                Social Trends
              </Link>
              <Icon type='arrow-right' className={styles.arrow} />
              Social context
            </div>
          ) : (
            <MobileHeader
              classes={{
                wrapper: styles.mobileHeader,
                left: styles.mobileHeader__left,
                searchBtn: styles.mobileHeader__search,
              }}
              title='Social context'
            />
          )}
          <Search
            topics={topics}
            linkedAssets={linkedAssets}
            activeLinkedAssets={activeLinkedAssets}
            setActiveLinkedAssets={setActiveLinkedAssets}
            onChangeTopics={updTopics}
            isDesktop={isDesktop}
          />
          {isDesktop && <Suggestions />}
          {!isEmptySearch ? (
            <SocialTool
              linkedAssets={activeLinkedAssets}
              allDetectedAssets={linkedAssets}
              settings={{ slug: topics[0], addedTopics: topics.slice(1) }}
            />
          ) : (
            <>
              <h4 className={styles.titlePopular}>Popular trends</h4>
              <SocialGrid className={styles.grid} />
            </>
          )}
        </div>
        <Sidebar
          topics={topics}
          linkedAssets={activeLinkedAssets}
          hasPremium={hasPremium}
          isDesktop={isDesktop}
          isEmptySearch={isEmptySearch}
        />
      </div>
    </div>
  )
}

export default ({ match: { params = {} } = {}, ...rest }) => (
  <TrendsExplore topic={safeDecode(params.word)} addedTopics={getTopicsFromUrl()} {...rest} />
)
