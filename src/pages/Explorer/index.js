import React from 'react'
import toReact from 'svelte-adapter/react'
import EventBanner from '../../components/EventBanner'
import SvelteMain from './Main'
import styles from './index.module.scss'

export const Main = toReact(SvelteMain, {}, 'div')

const ExplorerPage = () => (
  <div className={styles.wrapper}>
    <EventBanner />
    <Main />
  </div>
)

export default ExplorerPage
