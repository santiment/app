import React from 'react'
import toReact from 'svelte-adapter/react'
import EventBanner from '../../components/EventBanner'
import SveltePage from './index.svelte'
import { useUser } from '../../stores/user'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'

export const Page = toReact(SveltePage, { flex: 1, margin: '24px auto' }, 'div')

const ExplorerPage = () => {
  const { user } = useUser()
  const userSubscriptionData = useUserSubscriptionStatus()
  return (
    <>
      <EventBanner />
      <Page user={user} userSubscriptionData={userSubscriptionData} />
    </>
  )
}

export default ExplorerPage
