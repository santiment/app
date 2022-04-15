<script>
  import Range from 'webkit/ui/Range.svelte'
  import Category from './Category.svelte'
  import LayoutItem from '../Layouts/LayoutItem.svelte'
  import AssetSelector from '../Components/AssetSelector.svelte'
  import EmptyState from '../Components/EmptyState.svelte'
  import TypeSelector from '../Components/TypeSelector.svelte'
  import { queryExplorerItems } from '../api'
  import { currentUser } from '../store'
  import { EntityType, RANGES, MenuItem } from '../const'

  export let activeMenu
  let items = []
  let range = ''
  let assets = []
  let types = new Set(Object.values(EntityType).map((t) => t.key))
  let page = 1
  let pages = 1

  function fetch() {
    const voted = activeMenu === MenuItem.LIKES
    const currentUserDataOnly = activeMenu === MenuItem.MY_CREATIONS
    queryExplorerItems({ types: Array.from(types), voted, range, page, currentUserDataOnly }).then(
      (res) => {
        pages = res.pages
        if (page === 1) {
          items = res.items
        } else {
          items = [...items, ...res.items]
        }
      },
    )
  }

  $: activeMenu, range, assets, types, page, fetch()

  $: showEmpty =
    (!$currentUser && activeMenu === MenuItem.MY_CREATIONS) ||
    (items.length === 0 && activeMenu !== MenuItem.NEW)

  function getAssets({ project, metricsJson }) {
    const _metricsJson = Object.values(metricsJson).filter((m) => m.slug)
    const assets = new Set([project, ..._metricsJson])
    return Array.from(assets)
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
      />
      <AssetSelector onChange={(newAssets) => (assets = newAssets)} />
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
          hasIcons
          assets={item.screener.listItems.map((i) => i.project)}
        />
      {:else if item.projectWatchlist}
        <LayoutItem
          item={item.projectWatchlist}
          showActions
          type="WATCHLIST"
          hasIcons
          assets={item.projectWatchlist.listItems.map((i) => i.project)}
        />
        <!-- {:else if item.addressWatchlist}
        <LayoutItem
          item={item.addressWatchlist}
          showActions
          type="ADDRESS"
          hasIcons
          assets={item.addressWatchlist.listItems.map((i) => i.project)}
        /> -->
      {/if}
    </svelte:fragment>
  </Category>
{/if}
