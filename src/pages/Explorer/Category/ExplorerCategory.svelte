<script>
  import { setContext, onMount, onDestroy } from 'svelte'
  import Category from './Category.svelte'
  import LayoutItem from '../Layouts/LayoutItem.svelte'
  import EmptyState from '../Components/EmptyState.svelte'
  import TypeSelector from '../Components/TypeSelector.svelte'
  import { queryExplorerItems } from '../api'
  import { currentUser } from '../store'
  import { RANGES, MenuItem, getExplorerItem, EntityKeys, FILTERABLE_TABS } from '../const'
  import { notifyError } from '../helpers'

  export let activeMenu
  export let onLoadingChange = (newLoading) => {}

  const TIME_RANGES = Object.keys(RANGES)

  let range = ''
  let selectedRangeIndex = TIME_RANGES.indexOf('All time')
  let assets = []
  let displayingTypes = new Set()
  let page = 1
  let pages = 1
  let items = []
  let insights = []
  let insightsPage = 1
  let insightsPages = 1
  let pullingTimer
  let deselectAssets = () => {}
  let loading = false
  let deletedItems = []
  let hasInsights = false

  $: activeMenu, reset()
  $: showEmpty = !$currentUser && ![MenuItem.NEW, MenuItem.SANTIMENT].includes(activeMenu)
  $: voted = activeMenu === MenuItem.LIKES
  $: favorites = activeMenu === MenuItem.FAVORITES
  $: currentUserDataOnly = activeMenu === MenuItem.MY_CREATIONS
  $: userRoleDataOnly = activeMenu === MenuItem.SANTIMENT
  $: isFeaturedDataOnly = activeMenu === MenuItem.SANTIMENT
  $: range, assets, displayingTypes, page, fetch()
  $: displayingTypes, filterInsights()
  $: onLoadingChange(loading)
  $: items = filterDeletedItems(deletedItems)

  const filterableTabKeys = FILTERABLE_TABS.map((entity) => entity.key)

  function filterDeletedItems(deletedItems) {
    const deletedSet = new Set(deletedItems)
    return items.filter((item) => !deletedSet.has(getExplorerItem(item)))
  }

  function getDisplayingType(displayingTypes) {
    if (displayingTypes.size < 1) return filterableTabKeys

    const values = new Set(displayingTypes)
    const hasWatchlist = values.has(EntityKeys.PROJECT_WATCHLIST)
    const hasAddress = values.has(EntityKeys.ADDRESS_WATCHLIST)

    if (hasWatchlist && !hasAddress) {
      values.add(EntityKeys.ADDRESS_WATCHLIST)
    } else if (!hasWatchlist && hasAddress) {
      values.delete(EntityKeys.ADDRESS_WATCHLIST)
    }

    return Array.from(values)
  }

  setContext(
    'filterExplorerItems',
    (itemToExclude) => (deletedItems = deletedItems.concat(itemToExclude)),
  )

  setContext('updateExplorerItem', (itemToUpdate, title, description, isPublic) => {
    const target = itemToUpdate.trigger || itemToUpdate
    target.title = title
    target.description = description
    target.isPublic = isPublic
    items = items
  })

  function fetch(bypassLoading = false) {
    if (showEmpty) {
      pages = 1
      page = 1
      items = []
      return
    }
    if (!bypassLoading) loading = true

    queryExplorerItems({
      types: [EntityKeys.INSIGHT],
      page: insightsPage,
    })
      .then((res) => {
        if (activeMenu === MenuItem.FAVORITES) {
          insightsPages = res.pages
          insights = insightsPage === 1 ? res.items : insights.concat(res.items)
        }
      })
      .catch(() => notifyError({ user: $currentUser }))
      .finally(() => {
        queryExplorerItems({
          types: getDisplayingType(displayingTypes),
          voted,
          favorites,
          range,
          page,
          currentUserDataOnly,
          assets,
          userRoleDataOnly,
          isFeaturedDataOnly,
        })
          .then((res) => {
            pages = res.pages
            items = page === 1 ? res.items : items.concat(res.items)
          })
          .catch(() => notifyError({ user: $currentUser }))
          .finally(() => (loading = false))
      })
  }

  function reset() {
    page = 1
    insightsPage = 1
    deselectAssets()
    displayingTypes = new Set()
    range = ''
    selectedRangeIndex = TIME_RANGES.indexOf('All time')
  }

  const getAssets = ({ project, metricsJson }) => [
    project,
    ...Object.values(metricsJson).filter(({ slug }) => slug !== project.slug),
  ]

  function getAddressLabels(listItems) {
    let labels = listItems
      .map((i) => i.blockchainAddress.labels)
      .flat()
      .filter((l) => l.name)
      .map((l) => l.name)
    labels = new Set(labels)
    labels = Array.from(labels)
    return labels
  }

  function filterInsights() {
    const values = new Set(getDisplayingType(displayingTypes))
    hasInsights = values.has(EntityKeys.INSIGHT)

    if (!hasInsights) {
      insights = []
      insightsPage = 1
      insightsPages = 1
    }
  }

  onMount(() => {
    if (activeMenu === MenuItem.FAVORITES) {
      queryExplorerItems({
        types: getDisplayingType(displayingTypes),
        voted,
        favorites,
        range,
        page,
        currentUserDataOnly,
        assets,
        userRoleDataOnly,
        isFeaturedDataOnly,
      })
        .then((res) => {
          if (res.items.length === 0) activeMenu = MenuItem.NEW
        })
        .catch(() => notifyError({ user: $currentUser }))
    }

    pullingTimer = setTimeout(() => fetch(true), 60 * 1000)
  })
  onDestroy(() => clearTimeout(pullingTimer))
</script>

<Category
  isMain
  {favorites}
  title="Explorer"
  {items}
  {insights}
  {hasInsights}
  {loading}
  onMore={() => {
    page += 1
    insightsPage += 1
  }}
  hasMore={page < pages}
>
  <div slot="header" class="controls row mrg-a mrg--l">
    <TypeSelector
      flat
      onChange={(newTypes) => {
        displayingTypes = newTypes
        page = 1
        insightsPage = 1
      }}
      {displayingTypes}
    />
  </div>

  <svelte:fragment let:item>
    {#if item.chartConfiguration}
      <LayoutItem
        item={item.chartConfiguration}
        showActions
        type="CHART"
        hasIcons
        assets={getAssets(item.chartConfiguration)}
      />
    {:else if item.screener}
      <LayoutItem
        item={item.screener}
        showActions
        type="SCREENER"
        id="{item.screener.id}-watchlist"
      />
    {:else if item.projectWatchlist}
      <LayoutItem item={item.projectWatchlist} showActions type="WATCHLIST" />
    {:else if item.addressWatchlist}
      <LayoutItem
        item={item.addressWatchlist}
        showActions
        type="ADDRESS"
        assets={getAddressLabels(item.addressWatchlist.listItems)}
      />
    {:else if item.insight}
      <LayoutItem item={item.insight} showActions type="INSIGHT" />
    {:else if item.userTrigger}
      <LayoutItem item={item.userTrigger} showActions type="ALERT" hasIcons />
    {/if}
  </svelte:fragment>
</Category>

{#if showEmpty || (!loading && items.length === 0 && insights.length === 0)}
  <EmptyState {activeMenu} />
{/if}
