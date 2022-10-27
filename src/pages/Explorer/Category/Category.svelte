<script>
  import { getPostMonthDay, getDateFormats } from '../../../utils/dates'
  import { getExplorerItem } from '../const'

  let className = ''
  export { className as class }
  export let title
  export let items = []
  export let insights = []
  export let hasMore = true
  export let onMore
  export let small = false
  export let iconClass = ''
  export let loading = false
  export let showLess = false
  export let isMain = false
  export let favorites = false
  export let hasInsights = false
  export let sortedItems = []

  $: isMain && changeOrder(items)
  $: isMain && changeOrder(insights)

  // Formula: Likes * 0.3 + Comments * 0.7
  const getRank = (item) => item.votes.totalVotes * 0.3 + item.commentsCount * 0.7

  function changeOrder(items) {
    const modifiedItems = [...items]

    modifiedItems.forEach((item) => {
      const explorerItem = getExplorerItem(item)

      item.insertedAt = explorerItem.insertedAt || explorerItem.publishedAt
      const insertedAt = new Date(item.insertedAt)

      item.postdate = getPostMonthDay(insertedAt)

      const { YYYY, MM, DD } = getDateFormats(insertedAt)

      item.date = `${YYYY}${MM}${DD}`
      item.rank = getRank(explorerItem)
      item.first = false
      item.last = false
    })

    if (!favorites) {
      modifiedItems.sort((a, b) => (a.postdate === b.postdate ? b.rank - a.rank : 0))

      addFirstAndLastItems(modifiedItems)
    } else {
      sortedItems = [...modifiedItems]
    }
  }

  function addFirstAndLastItems(modifiedItems) {
    const lastIndex = modifiedItems.length - 1
    const dates = new Set()
    modifiedItems.forEach((item, index) => {
      if (!dates.has(item.date)) {
        dates.add(item.date)
        item.first = true
        if (index > 0) {
          modifiedItems[index - 1].last = true
        }
        if (index === lastIndex) {
          item.last = true
        }
      }
    })
    sortedItems = [...modifiedItems]
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

  {#each isMain ? sortedItems : items as item, index (item)}
    {#if isMain && item.first && !favorites}
      <div class="postdate c-waterloo">{item.postdate}</div>
    {/if}
    <div
      class="item btn"
      class:first={isMain && item.first && !item.last}
      class:last={isMain && item.last && !item.first}
      class:center={isMain && !item.first && !item.last && !favorites}
      class:single={isMain && item.first && item.last}
      class:favorites
    >
      <slot {item} />
    </div>
    {@const itemCount = index + 1}
    {@const insight = insights[itemCount / 2]}
    {#if hasInsights && favorites && itemCount % 2 === 0 && insight}
      <div class="item btn" class:favorites>
        <slot item={insight} />
      </div>
    {/if}
  {/each}

  {#if hasInsights && insights.length > 0 && !loading && !hasMore && favorites && isMain}
    {@const restInsights = insights.slice(items.length / 2)}
    {#each restInsights as insight}
      <div class="item btn" class:favorites>
        <slot item={insight} />
      </div>
    {/each}
  {/if}

  {#if hasMore || showLess}
    <div
      class="more btn row h-center c-waterloo"
      class:showMoreMain={isMain}
      class:loading
      on:click={onMore}
    >
      Show {showLess ? 'less' : 'more'}
    </div>
  {/if}
</div>

<style>
  .border {
    border-radius: 8px;
  }

  .category {
    --padding: 24px;
    background-color: var(--white);
  }

  .small {
    --padding: 16px;
  }

  .header {
    height: 66px;
    padding: 0 var(--padding);
  }

  .isMain .header {
    border-radius: 8px 8px 0 0;
    border: 1px solid var(--porcelain);
  }

  .favorites {
    border-top: 0 !important;
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
    --bg-hover: var(--whale);
  }

  .center {
    border: 1px solid var(--porcelain);
    border-bottom: 0;
  }

  .more.last,
  .isMain .item {
    --bg-hover: var(--whale);
  }

  .item {
    padding: 16px var(--padding);
  }

  .isMain .item {
    border: 1px solid var(--porcelain);
    border-radius: 0;
  }

  .isMain .center {
    border-bottom: 0;
  }

  .isMain .first {
    border-bottom: 0;
  }

  .more {
    padding: 13.5px 0;
  }

  .showMoreMain {
    --bg-hover: var(--whale);
    --color-hover: var(--green);

    border: 1px solid var(--porcelain);
    border-radius: 0 0 8px 8px;
  }

  .postdate {
    padding: 12px 24px;
    background: var(--athens);
    border-left: 1px solid var(--porcelain);
    border-right: 1px solid var(--porcelain);
  }

  .isMain .more.last {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
</style>
