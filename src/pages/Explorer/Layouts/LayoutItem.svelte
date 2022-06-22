<script>
  import SidebarItem from '../Layouts/SidebarItem.svelte'
  import ExplorerItem from '../Layouts/ExplorerItem.svelte'
  import { getItemRoute, getItemUrl } from '../const'
  import { history } from '../../../redux'

  export let small = false
  export let item
  export let type = 'CHART'
  export let showActions = false
  export let hasIcons = false
  export let assets = []

  const ACTION_BUTTON_CLASS = 'actionbutton'

  $: url = getItemUrl(item, type)

  function onClick(e) {
    const isIcon = e.target && ['use', 'svg'].includes(e.target.tagName)

    const isActionButton =
      e.target.classList.contains(ACTION_BUTTON_CLASS) ||
      (e.target.parentElement && e.target.parentElement.classList.contains(ACTION_BUTTON_CLASS))

    if (isIcon || isActionButton) {
      e.preventDefault()
      return
    }

    if (!e.ctrlKey && url.includes(location.hostname)) {
      e.preventDefault()
      history.push(getItemRoute(item, type))
      return
    }
  }
</script>

{#if small}
  <SidebarItem {item} {small} {showActions} {url} {onClick} />
{:else}
  <ExplorerItem {item} {type} {url} {hasIcons} {assets} {onClick} />
{/if}
