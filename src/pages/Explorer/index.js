import React from 'react'
import toReact from 'svelte-adapter/react'
import EventBanner from '../../components/EventBanner'
import SveltePage from './index.svelte'
import { useUser } from '../../stores/user'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import { useTrendingWords, useTrendWordContext } from '../../ducks/TrendsTable/hooks'

const PAGE_STYLE = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  margin: '24px 0 100px 240px',
}

export const Page = toReact(SveltePage, PAGE_STYLE, 'div')

const ExplorerPage = () => {
  const { user } = useUser()
  const userSubscriptionData = useUserSubscriptionStatus()
  const { words } = useTrendingWords()
  const { data } = useTrendWordContext(words)

  return (
    <>
      <EventBanner />
      <Page user={user} userSubscriptionData={userSubscriptionData} words={data} />
    </>
  )
}

export default ExplorerPage
