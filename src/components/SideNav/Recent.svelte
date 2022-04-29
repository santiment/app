<script>
  import { onDestroy } from 'svelte'
  import { getSEOLinkFromIdAndTitle } from 'webkit/utils/url'
  import { queryRecentLayouts } from 'studio/Sidebar/Layouts/utils'
  import { getRecentWatchlists, getRecentScreeners } from '@/utils/recent'
  import Section from './Section.svelte'
  import { queryRecentWatchlists } from './api'

  export let pathname

  let layouts = []
  let watchlists = []
  let screeners = []

  $: recents = layouts.concat(watchlists).concat(screeners)

  const getLayouts = () =>
    queryRecentLayouts().then((items) => {
      layouts = items.map(({ id, title }) => {
        return [title, '/charts/' + getSEOLinkFromIdAndTitle(id, title), 'chart']
      })
    })

  const getWatchlists = () =>
    queryRecentWatchlists(getRecentWatchlists()).then((items) => {
      watchlists = items.map(({ id, title }) => {
        return [title, '/watchlist/projects/' + getSEOLinkFromIdAndTitle(id, title), 'report']
      })
    })

  const getScreeners = () =>
    queryRecentWatchlists(getRecentScreeners()).then((items) => {
      screeners = items.map(({ id, title }) => {
        return [title, '/screener/' + getSEOLinkFromIdAndTitle(id, title), 'screener']
      })
    })

  function getRecents() {
    getLayouts()
    getWatchlists()
    getScreeners()
  }

  getRecents()
  const interval = setInterval(getRecents, 8000) // HACK: should dispatch events on new recents
  onDestroy(() => clearInterval(interval))
</script>

<Section title="Recent" icon="time" links={recents} {pathname} />
