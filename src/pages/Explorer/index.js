import React from 'react'
import toReact from 'svelte-adapter/react'
import EventBanner from '../../components/EventBanner'
import SvelteMain from './Main'

export const Main = toReact(SvelteMain, {}, 'div')

const ExplorerPage = () => (
  <div className='fluid' style={{ flex: '1' }}>
    <EventBanner />
    <Main />
  </div>
)

export default ExplorerPage
