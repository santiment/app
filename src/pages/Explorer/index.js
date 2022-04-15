import React from 'react'
import toReact from 'svelte-adapter/react'
import EventBanner from '../../components/EventBanner'
import SveltePage from './index.svelte'
import { useUser } from '../../stores/user'

export const Page = toReact(SveltePage, { flex: 1, margin: '24px auto' }, 'div')

const ExplorerPage = () => {
  const { user } = useUser()

  return (
    <>
      <EventBanner />
      <Page user={user} />
    </>
  )
}

export default ExplorerPage
