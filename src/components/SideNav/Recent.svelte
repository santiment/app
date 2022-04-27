<script>
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

  queryRecentLayouts().then((items) => {
    layouts = items.map(({ id, title }) => {
      return [title, '/charts/' + getSEOLinkFromIdAndTitle(id, title), 'chart']
    })
  })

  queryRecentWatchlists(getRecentWatchlists()).then((items) => {
    watchlists = items.map(({ id, title }) => {
      return [title, '/watchlist/projects/' + getSEOLinkFromIdAndTitle(id, title), 'report']
    })
  })

  queryRecentWatchlists(getRecentScreeners()).then((items) => {
    screeners = items.map(({ id, title }) => {
      return [title, '/screener/' + getSEOLinkFromIdAndTitle(id, title), 'screener']
    })
  })
</script>

<Section title="Recent" icon="time" links={recents} {pathname} />
