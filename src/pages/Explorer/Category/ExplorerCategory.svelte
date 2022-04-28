<script>
  import { setContext } from 'svelte'
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

  let range = ''
  let assets = []
  let types = new Set(Object.values(EntityType).map((t) => t.key))
  let page = 1
  let pages = 1
  let items = []

  setContext('filterExplorerItems', (itemToExclude) => {
    items = items.filter((item) => getExplorerItem(item) !== itemToExclude)
  })

  function fetch() {
    onLoadingChange(true)
    const voted = activeMenu === MenuItem.LIKES
    const currentUserDataOnly = activeMenu === MenuItem.MY_CREATIONS
    queryExplorerItems({
      types: Array.from(types),
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
      .finally(() => onLoadingChange(false))
  }

  $: activeMenu, range, assets, types, page, fetch()
  $: showEmpty =
    (!$currentUser && activeMenu === MenuItem.MY_CREATIONS) ||
    (items.length === 0 && activeMenu !== MenuItem.NEW)

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
</script>

{#if showEmpty}
  <EmptyState {activeMenu} />
{:else}
  <Category title="Explorer" {items} onMore={() => (page += 1)} hasMore={page < pages}>
    <div slot="header" class="controls row mrg-a mrg--l">
      <Range
        items={Object.keys(RANGES)}
        selectedIndex={4}
        onChange={(newRange) => (range = newRange)}
        class="mrg-s mrg--r"
      />
      <AssetSelector onChange={(newAssets) => (assets = newAssets.map((asset) => asset.slug))} />
      <TypeSelector onChange={(newTypes) => (types = newTypes)} {types} />
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
{/if}
