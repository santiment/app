<script>
  import { getPostMonthDay, getDateFormats } from '../../../utils/dates'
  import { getExplorerItem } from '../const'

  let className = ''
  export { className as class }
  export let title
  export let items = []
  export let hasMore = true
  export let onMore
  export let small = false
  export let iconClass = ''
  export let loading = false
  export let showLess = false
  export let isMain = false

  $: isMain && changeOrder(items)

  // Formula: Likes * 0.3 + Comments * 0.7
  const getRank = (item) => item.votes.totalVotes * 0.3 + item.commentsCount * 0.7

  function changeOrder(items) {
    items.forEach((item) => {
      const explorerItem = getExplorerItem(item)
      item.insertedAt = explorerItem.insertedAt
      const insertedAt = new Date(explorerItem.insertedAt)
      item.postdate = getPostMonthDay(insertedAt)
      const { YYYY, MM, DD } = getDateFormats(insertedAt)
      item.date = `${YYYY}${MM}${DD}`
      item.rank = getRank(explorerItem)
      item.first = false
      item.last = false
    })
    items.sort((a, b) =>
      a.postdate === b.postdate ? b.rank - a.rank : b.insertedAt - a.insertedAt,
    )
    addFirstAndLastItems()
  }

  function addFirstAndLastItems() {
    const lastIndex = items.length - 1
    const dates = new Set()
    items.forEach((item, index) => {
      if (!dates.has(item.date)) {
        dates.add(item.date)
        item.first = true
        if (index > 0) {
          items[index - 1].last = true
        } else if (index === lastIndex) {
          item.last = true
        }
      }
    })
  }
</script>

<div class="category mrg--b mrg-xl {className}" class:small class:border={!isMain} class:isMain>
  <div class="header row justify v-center">
    {#if $$slots.icon}
      <div class="icon row hv-center mrg-s mrg--r {iconClass}">
        <slot name="icon" />
      </div>
    {/if}

    <h2 class="{small ? 'body-2' : 'body-1'} txt-m">{title}</h2>

    {#if $$slots.header}
      <div class="mrg-a mrg--l">
        <slot name="header" />
      </div>
    {/if}
  </div>

  {#each items as item (item)}
    {#if isMain && item.first}
      <div class="postdate c-waterloo">{item.postdate}</div>
    {/if}
    <div
      class="item btn"
      class:first={isMain && item.first}
      class:last={isMain && item.last}
      class:center={isMain && !item.first && !item.last}
    >
      <slot {item} />
    </div>
  {/each}

  {#if hasMore || showLess}
    <div class="more btn row h-center c-accent" class:last={isMain} class:loading on:click={onMore}>
      Show {showLess ? 'less' : 'more'}
    </div>
  {/if}
</div>

<style>
  .border {
    border-radius: 8px;
  }

  .category {
    overflow: hidden;
    --padding: 24px;
  }

  .small {
    --padding: 16px;
  }

  .header {
    height: 66px;
    padding: 0 var(--padding);
  }

  .isMain .header {
    border-radius: 8px;
    border: 1px solid var(--porcelain);
    margin-bottom: 24px;
  }

  .icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
  }

  .border .item,
  .border .more {
    border-radius: 0;
    border-top: 1px solid var(--porcelain);
    --bg-hover: var(--athens);
  }

  .center {
    border: 1px solid var(--porcelain);
    border-bottom: 0;
  }

  .more.last,
  .isMain .item {
    --bg-hover: var(--athens);
  }

  .isMain .item {
    border-radius: 0;
  }

  .item {
    padding: 12px var(--padding);
  }

  .more {
    padding: 13.5px 0;
  }

  .postdate {
    margin: 0 0 12px 24px;
  }

  .isMain .first {
    border: 1px solid var(--porcelain);
    border-bottom: 0;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }

  .isMain .last {
    border: 1px solid var(--porcelain);
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    margin-bottom: 24px;
  }

  .isMain .more.last {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
</style>
