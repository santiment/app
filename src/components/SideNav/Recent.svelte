<script>
  import { getSEOLinkFromIdAndTitle } from 'webkit/utils/url'
  import { RecentType, getRecents, saveRecents, removeRecent } from 'webkit/utils/recents'
  import { getSavedRecentLayoutIds } from 'studio/Layouts/utils'
  import { queryShortLayout } from 'studio/api/layouts'
  import { getRecentWatchlists, getRecentScreeners } from '@/utils/recent'
  import { queryWatchlist } from './api'
  import Section from './Section.svelte'

  export let pathname
  export let isPeeked

  prepareRecents()
  const RecentFetcher = {
    [RecentType.CHART_LAYOUT]: queryShortLayout,
    [RecentType.WATCHLIST]: queryWatchlist,
    [RecentType.SCREENER]: queryWatchlist,
  }

  let recents = []

  $: isPeeked, queryRecents()

  function queryRecents() {
    Promise.all(prepareRecents().map((recent) => queryRecent(recent))).then(
      (items) => (recents = items.filter(Boolean)),
    )
  }

  function mapRecent(type, { id, title }) {
    switch (type) {
      case RecentType.CHART_LAYOUT:
        return [title, '/charts/' + getSEOLinkFromIdAndTitle(id, title), 'chart']
      case RecentType.WATCHLIST:
        return [title, '/watchlist/projects/' + getSEOLinkFromIdAndTitle(id, title), 'report']
      case RecentType.SCREENER:
        return [title, '/screener/' + getSEOLinkFromIdAndTitle(id, title), 'screener']
    }
  }

  function queryRecent({ type, id }) {
    return RecentFetcher[type](id)
      .then((item) => mapRecent(type, item))
      .catch(() => {
        removeRecent(type, id)
        return null
      })
  }

  function prepareRecents() {
    const recents = getRecents()
    if (recents.length) return recents

    const charts = getSavedRecentLayoutIds().map((id) => ({ type: RecentType.CHART_LAYOUT, id }))
    const watchlists = getRecentWatchlists().map((id) => ({ type: RecentType.WATCHLIST, id }))
    const screeners = getRecentScreeners().map((id) => ({ type: RecentType.SCREENER, id }))

    return saveRecents(charts.concat(watchlists).concat(screeners))
  }
</script>

<Section title="Recents" icon="time" links={recents} {pathname} />
