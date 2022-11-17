<script>
  import Svg from 'webkit/ui/Svg/svelte'

  export let title = ''
  export let icon = ''
  export let pathname
  export let links

  let isOpened = true
</script>

<div
  class="category btn row v-center mrg-xl mrg--t txt-b"
  class:opened={isOpened}
  on:click={() => (isOpened = !isOpened)}
>
  <Svg id={icon} w="16" class="mrg-s mrg--r $style.icon" />
  {title}
  <Svg id="arrow-down" w="10" h="5.5" class="mrg-a mrg--l $style.arrow" />
</div>

{#if isOpened}
  <section class="mrg-s mrg--t nowrap">
    {#each links as [label, href, icon]}
      <a
        {href}
        class="btn mrg-xs mrg--t"
        class:active={pathname === href}
        on:click={window.__onLinkClick}
      >
        <Svg id={icon} w="16" class="mrg-m mrg--r" />

        <span>{label}</span>
      </a>
    {:else}
      <div class="empty c-waterloo mrg-s mrg--l">
        Here, we display your recently viewed chart layouts, watchlists, and screeners
      </div>
    {/each}
  </section>
{/if}

<style>
  .category {
    --fill-hover: var(--green);
  }

  .opened {
    --rotate: 180deg;
  }

  .icon {
    fill: var(--green);
  }

  .arrow {
    transform: rotate(var(--rotate));
  }

  span {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .empty {
    white-space: normal;
  }
</style>
