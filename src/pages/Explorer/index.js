import React, { useEffect } from 'react'
// import toReact from 'svelte-adapter/react'
import EventBanner from '../../components/EventBanner'
import SveltePage from './index.svelte'
import { useUser } from '../../stores/user'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import {
  useTrendingWords,
  useTrendSocialVolume,
  useTrendWordContext,
} from '../../ducks/TrendsTable/hooks'
import { trendingWords, trendingWordsVolume } from './store'

const PAGE_STYLE = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  margin: '14px 0 100px 240px',
}

export const Page = () => null

const ExplorerPage = () => {
  const { user } = useUser()
  const userSubscriptionData = useUserSubscriptionStatus()
  const { words } = useTrendingWords()
  const { data } = useTrendWordContext(words)
  const { data: socialVolume } = useTrendSocialVolume(words)

  useEffect(() => {
    trendingWords.set(words.map((word) => ({ word, tags: data[word] || [] })))
  }, [data])

  useEffect(() => {
    trendingWordsVolume.set(socialVolume)
  }, [socialVolume])

  return (
    <>
      <EventBanner />
      <Page user={user} userSubscriptionData={userSubscriptionData} />
    </>
  )
}

export default ExplorerPage
