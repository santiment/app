import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import Icon from '@santiment-network/ui/Icon'
import SocialTool from '../SocialTool'
import Page from '../../ducks/Page'
import Suggestions from '../../components/Trends/Search/Suggestions'
import SocialGrid from '../../components/SocialGrid'
import Search from './Search'
import Sidebar from './Sidebar'
import { useProjects, getProjectInfo } from '../../stores/projects'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import { safeDecode, updateHistory } from '../../utils/utils'
import { addRecentTrends } from '../../utils/recent'
import { trackTopicSearch } from '../../components/Trends/Search/utils'
import { getTopicsFromUrl, updTopicsInUrl } from './url'
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

  const isEmptySearch = !topics[0]
  const pageTitle = `Crypto Social Trends for ${topic} - Sanbase`

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

  const search = (
    <Search
      topics={topics}
      linkedAssets={linkedAssets}
      activeLinkedAssets={activeLinkedAssets}
      setActiveLinkedAssets={setActiveLinkedAssets}
      onChangeTopics={updTopics}
      isDesktop={isDesktop}
    />
  )

  return (
    <Page
      className={cx(styles.wrapper, 'row')}
      title={isDesktop ? null : 'Social Tool'}
      mainClassName={cx(styles.content, 'row')}
      hasHeader={!isDesktop}
    >
      <Helmet
        title={pageTitle}
        meta={[
          { property: 'og:title', content: pageTitle },
          { property: 'og:description', content: pageDescription },
        ]}
      />
      {!isDesktop && search}
      <div
        className={cx(styles.main, 'column', isEmptySearch && !isDesktop && styles.mainEmptySearch)}
      >
        {isDesktop && (
          <>
            <div className='row v-center mrg-xl mrg--b mrg--t'>
              <Link to='/dashboards' className={cx(styles.link, 'btn')}>
                Social Trends
              </Link>
              <Icon type='arrow-right' className={cx(styles.arrow, 'mrg-m mrg--l mrg--r')} />
              Social context
            </div>
            {search}
            <Suggestions />
          </>
        )}
        {!isEmptySearch ? (
          <SocialTool
            linkedAssets={activeLinkedAssets}
            allDetectedAssets={linkedAssets}
            settings={{ slug: topics[0], addedTopics: topics.slice(1) }}
          />
        ) : (
          <>
            <h4
              className={cx(
                'txt-m mrg-xxl mrg--t',
                isDesktop ? 'h4' : cx(styles.popularTrends, 'body-1'),
              )}
            >
              Popular trends
            </h4>
            <SocialGrid isCompact={!isDesktop} className={'mrg-xl mrg--t mrg--b'} />
          </>
        )}
      </div>
      {isDesktop && <div className={cx(styles.divider, 'mrg-xxl mrg--l mrg--r')} />}
      <div className={cx(styles.sidebar, 'relative')}>
        <Sidebar
          topics={topics}
          linkedAssets={activeLinkedAssets}
          hasPremium={hasPremium}
          isDesktop={isDesktop}
          isEmptySearch={isEmptySearch}
        />
      </div>
    </Page>
  )
}

export default ({ match: { params = {} } = {}, ...rest }) => (
  <TrendsExplore topic={safeDecode(params.word)} addedTopics={getTopicsFromUrl()} {...rest} />
)
