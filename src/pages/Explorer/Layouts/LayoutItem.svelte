<script>
  import SidebarItem from '../Layouts/SidebarItem.svelte'
  import ExplorerItem from '../Layouts/ExplorerItem.svelte'
  import { getItemUrl } from '../const'

  export let small = false
  export let item
  export let type = 'CHART'
  export let showActions = false
  export let hasIcons = false
  export let assets = []
</script>

{#if small}
  <SidebarItem {item} {small} {type} {showActions} url={getItemUrl(item, type)} />
{:else}
  <ExplorerItem {item} {type} url={getItemUrl(item, type)} {hasIcons} {assets} />
{/if}
