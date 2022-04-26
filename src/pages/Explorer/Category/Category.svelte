<script>
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
</script>

<div class="border mrg--b mrg-xl {className}" class:small>
  <div class="header row v-center">
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
    <div class="item btn">
      <slot {item} />
    </div>
  {/each}

  {#if hasMore || showLess}
    <div class="more btn row h-center c-accent" class:loading on:click={onMore}>
      Show {showLess ? 'less' : 'more'}
    </div>
  {/if}
</div>

<style>
  .border {
    border-radius: 8px;
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

  .icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
  }

  .item,
  .more {
    border-radius: 0;
    border-top: 1px solid var(--porcelain);
    --bg-hover: var(--athens);
  }

  .item {
    padding: 12px var(--padding);
  }

  .more {
    padding: 13.5px 0;
  }
</style>
