<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import { notifications$ } from 'webkit/ui/Notifications'
  import Category from './Category.svelte'
  import { trendingWords } from '../store'

  export let title = 'Recent Chart Layouts'
  export let icon = 'info'
  export let color = 'green'
  export let iconWidth = 16
  export let getItems

  let items = []
  let page = 1
  let pages = 1
  let loading = false

  $: hasMore = pages > 1 && page < pages
  $: showLess = pages > 1 && page === pages
  $: if (page === 1) items = []
  $: getPage(page, $trendingWords)

  function getPage(page, trends) {
    if (loading) return
    loading = true
    getItems(page, trends)
      .then((res) => {
        if (res) {
          pages = res.pages
          items = items.concat(res.items)
        }
      })
      .catch(() => {
        notifications$.show({
          variant: 'error',
          title: 'Something went wrong',
          description: 'Please try again or contact support',
        })
      })
      .finally(() => (loading = false))
  }

  function onMore() {
    if (loading) return
    if (showLess) {
      page = 1
    } else if (page < pages) {
      page += 1
    }
  }
</script>

<Category small {title} {items} {hasMore} {onMore} {showLess} {loading}>
  <div
    slot="icon"
    style="fill:var(--{color}); background:var(--{color}-light-1)"
    class="$style.icon row hv-center"
  >
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
