<script>
  import { getSEOLinkFromIdAndTitle } from 'webkit/utils/url'
  import { RecentType, getRecents, saveRecents, removeRecent } from 'webkit/utils/recents'
  import { trackSideNavRecents } from 'webkit/analytics/events/general'
  import { getSavedRecentLayoutIds } from 'studio/Layouts/utils'
  import { queryShortLayout } from 'studio/api/layouts'
  import { getRecentWatchlists, getRecentScreeners } from '@/utils/recent'
  import { queryWatchlist } from './api'
  import Section from './Section.svelte'
  import { getPageType } from '../../withTracker'

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
        return [title, '/charts/' + getSEOLinkFromIdAndTitle(id, title), 'chart', type]
      case RecentType.WATCHLIST:
        return [title, '/watchlist/projects/' + getSEOLinkFromIdAndTitle(id, title), 'report', type]
      case RecentType.SCREENER:
        return [title, '/screener/' + getSEOLinkFromIdAndTitle(id, title), 'screener', type]
    }
  }

  function queryRecent({ type, id }) {
    return RecentFetcher[type](id)
      .then((item) => (item ? mapRecent(type, item) : Promise.reject()))
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

  function onLinkClick(e) {
    const { currentTarget } = e
    const url = currentTarget.getAttribute('href')
    const { feature } = currentTarget.dataset

    trackSideNavRecents({
      feature,
      url: window.location.origin + url,
      source: getPageType(window.location.pathname),
    })

    window.__onLinkClick(e)
  }
</script>

<Section title="Recents" icon="time" links={recents} {pathname} {onLinkClick} />
