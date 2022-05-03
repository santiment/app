import React, { useEffect } from 'react'
import toReact from 'svelte-adapter/react'
import EventBanner from '../../components/EventBanner'
import SveltePage from './index.svelte'
import { useUser } from '../../stores/user'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import { useTrendingWords, useTrendWordContext } from '../../ducks/TrendsTable/hooks'
import { trendingWords } from './store'

const PAGE_STYLE = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  margin: '14px 0 100px 240px',
}

export const Page = toReact(SveltePage, PAGE_STYLE, 'div')

const ExplorerPage = () => {
  const { user } = useUser()
  const userSubscriptionData = useUserSubscriptionStatus()
  const { words } = useTrendingWords()
  const { data } = useTrendWordContext(words)

  useEffect(() => {
    trendingWords.set(data)
  }, [data])

  return (
    <>
      <EventBanner />
      <Page user={user} userSubscriptionData={userSubscriptionData} />
    </>
  )
}

export default ExplorerPage
