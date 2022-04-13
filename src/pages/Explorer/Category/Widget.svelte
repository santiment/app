<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Category from './Category.svelte'

  export let title = 'Recent Chart Layouts'
  export let icon = 'info'
  export let color = 'green'
  export let iconWidth = 16
  export let getItems = (page) => new Promise((resolve) => resolve([]))

  let items = []
  let page = 1
  let pages = 1

  $: hasMore = pages > 1 && page < pages
  $: page, getItems().then((res) => (items = res))

  function onMore() {
    if (page < pages) {
      page += 1
    }
  }
</script>

<Category small {title} {items} {hasMore} {onMore}>
  <div
    slot="icon"
    style="fill:var(--{color}); background:var(--{color}-light-1)"
    class="$style.icon row hv-center">
    <Svg id={icon} w={iconWidth} />
  </div>

  <svelte:fragment let:item>
    <slot {item} />
  </svelte:fragment>

  <slot slot="header" name="header" />
</Category>

<style>
  .icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
  }
</style>
