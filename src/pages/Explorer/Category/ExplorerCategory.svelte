<script>
  import { onMount } from 'svelte'
  import Range from 'webkit/ui/Range.svelte'
  import Category from './Category.svelte'
  import LayoutItem from '../Layouts/LayoutItem.svelte'
  import AssetSelector from '../Components/AssetSelector.svelte'
  import EmptyState from '../Components/EmptyState.svelte'
  import TypeSelector from '../Components/TypeSelector.svelte'
  import { getItems, EntityType, RANGES, MenuItem } from '../const'

  export let activeMenu
  let items = []
  let range = ''
  let assets = []
  let types = new Set(Object.values(EntityType))
  let page = 1

  function fetch() {
    const voted = activeMenu === MenuItem.LIKES
    const currentUserDataOnly = activeMenu === MenuItem.MY_CREATIONS
    const args = { voted, range, page, currentUserDataOnly }
    getItems(args).then((res) => (items = res))
  }

  onMount(fetch)
  $: activeMenu, range, assets, types, page, fetch()
</script>

{#if activeMenu !== MenuItem.NEW && items.length === 0}
  <EmptyState {activeMenu} />
{:else}
  <Category title="Explorer" {items} onMore={() => (page += 1)}>
    <div slot="header" class="controls row mrg-a mrg--l">
      <Range
        items={Object.keys(RANGES)}
        selectedIndex={4}
        onChange={(newRange) => (range = newRange)} />
      <AssetSelector onChange={(newAssets) => (assets = newAssets)} />
      <TypeSelector onChange={(newTypes) => (types = newTypes)} {types} />
    </div>

    <svelte:fragment let:item>
      {#if item.chartConfiguration}
        <LayoutItem
          item={item.chartConfiguration}
          showActions={true}
          type="CHART"
          hasIcons
          assets={[item.chartConfiguration.project]} />
      {:else if item.screener}
        <LayoutItem
          item={item.screener}
          showActions={true}
          type="SCREENER"
          hasIcons
          assets={item.screener.listItems.map((i) => i.project)} />
      {/if}
    </svelte:fragment>
  </Category>
{/if}
