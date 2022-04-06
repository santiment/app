import React from 'react'
import toReact from 'svelte-adapter/react'
import EventBanner from '../../components/EventBanner'
import SveltePage from './index.svelte'

export const Page = toReact(SveltePage, {flex: 1, margin: '24px auto'}, 'div')

const ExplorerPage = () => (
  <>
    <EventBanner />
    <Page />
  </>
)

export default ExplorerPage
