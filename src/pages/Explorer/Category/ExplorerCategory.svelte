<script>
  import { setContext, onMount, onDestroy } from 'svelte'
  import Range from 'webkit/ui/Range.svelte'
  import Category from './Category.svelte'
  import LayoutItem from '../Layouts/LayoutItem.svelte'
  import AssetSelector from '../Components/AssetSelector.svelte'
  import EmptyState from '../Components/EmptyState.svelte'
  import TypeSelector from '../Components/TypeSelector.svelte'
  import { queryExplorerItems } from '../api'
  import { currentUser } from '../store'
  import { EntityType, RANGES, MenuItem, getExplorerItem } from '../const'

  export let activeMenu
  export let onLoadingChange = () => {}

  const TIME_RANGES = Object.keys(RANGES)
  const ENTITY_KEYS = Object.values(EntityType)

  let range = ''
  let selectedRangeIndex = TIME_RANGES.indexOf('All time')
  let assets = []
  let selectedTypes = new Set(ENTITY_KEYS.map((t) => t.key))
  let page = 1
  let pages = 1
  let items = []
  let pullingTimer
  let deselectAssets = () => {}
  let loading = false

  $: activeMenu, reset()
  $: showEmpty = !$currentUser && activeMenu !== MenuItem.NEW
  $: voted = activeMenu === MenuItem.LIKES
  $: currentUserDataOnly = activeMenu === MenuItem.MY_CREATIONS
  $: range, assets, selectedTypes, page, fetch()
  $: onLoadingChange(loading)

  setContext('filterExplorerItems', (itemToExclude) => {
    items = items.filter((item) => getExplorerItem(item) !== itemToExclude)
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
      types: Array.from(selectedTypes),
      voted,
      range,
      page,
      currentUserDataOnly,
      assets,
    })
      .then((res) => {
        pages = res.pages
        items = page === 1 ? res.items : items.concat(res.items)
      })
      // TODO handle errors
      .catch((e) => console.log(e.message))
      .finally(() => (loading = false))
  }

  function reset() {
    page = 1
    deselectAssets()
    selectedTypes = new Set(ENTITY_KEYS.map((t) => t.key))
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

  onMount(() => (pullingTimer = setTimeout(() => fetch(true), 60 * 1000)))
  onDestroy(() => clearTimeout(pullingTimer))
</script>

<Category title="Explorer" {items} onMore={() => (page += 1)} hasMore={page < pages}>
  <div slot="header" class="controls row mrg-a mrg--l">
    {#if activeMenu !== MenuItem.MY_CREATIONS}
      <Range
        items={TIME_RANGES}
        selectedIndex={selectedRangeIndex}
        onChange={(newRange) => {
          range = RANGES[newRange]
          selectedRangeIndex = TIME_RANGES.indexOf(newRange)
        }}
        class="mrg-s mrg--r"
      />
      <AssetSelector
        onChange={(newAssets) => (assets = newAssets.map((asset) => asset.slug))}
        setDeselect={(deselectFunc) => (deselectAssets = deselectFunc)}
      />
      <TypeSelector onChange={(newTypes) => (selectedTypes = newTypes)} {selectedTypes} />
    {:else}
      <TypeSelector flat onChange={(newTypes) => (selectedTypes = newTypes)} {selectedTypes} />
    {/if}
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
    {:else if item.userTrigger}
      <LayoutItem item={item.userTrigger} showActions type="ALERT" hasIcons />
    {/if}
  </svelte:fragment>
</Category>

{#if showEmpty || (!loading && items.length === 0)}
  <EmptyState {activeMenu} />
{/if}
