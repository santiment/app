<script>

let className =''
export {className as class}
export let title 
  export let hasMore = true
  export let onMore
  export let small = false
  export let iconClass = ''

</script>

<div class="border {className}" class:small>
  <div class="header row v-center">
    {#if $$slots.icon}
      <div class="icon row hv-center mrg-s mrg--r {iconClass}">
        <slot name="icon" />
      </div>
    {/if}

    <h2 class="{small ? 'body-2' : 'body-1'} txt-m">{title}</h2>

    <slot name="header" />
  </div>

  <div class="item btn">
    <slot />
  </div>

  {#if hasMore}
    <div class="more btn row h-center c-accent" on:click={onMore}>
      Show more
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

  .item {
    border-radius: 0;
    border-top: 1px solid var(--porcelain);
    padding: 12px var(--padding);
    --bg-hover: var(--athens);
  }

  .more {
    border-radius: 0;
    border-top: 1px solid var(--porcelain);
    padding: 13.5px 0;
    --bg-hover: var(--athens);
  }
</style>
