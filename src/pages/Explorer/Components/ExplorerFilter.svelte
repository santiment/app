<script lang="ts">
  import Svg from 'webkit/ui/Svg/svelte'
  import { trackExplorerFiltersUse } from 'webkit/analytics/events/explorer'
  import { visibleMenus } from '../menu.ts'
  import type { MenuItem } from '../menu.ts'

  export let loading = false
  export let activeMenu: MenuItem

  function onFilterClick(filter) {
    if (loading) return

    activeMenu = filter
    trackExplorerFiltersUse(filter)
  }
</script>

<div class="wrapper row hv-center mrg--b mrg-xl">
  {#each visibleMenus as visibleMenu}
    <div
      class="btn-2 row v-center"
      class:active={activeMenu.is(visibleMenu.name)}
      class:loading={activeMenu.is(visibleMenu.name) && loading}
      on:click={() => onFilterClick(visibleMenu)}
    >
      <Svg id={visibleMenu.svg} w="16" class="mrg--r" />
      {visibleMenu.getMenuTitle()}
    </div>
  {/each}
</div>

<style lang="scss">
  .wrapper {
    background: var(--white);
    z-index: 5;
  }

  .btn-2 {
    --margin: 6px;
    padding: 9px 15px;
    --fill: var(--waterloo);
    border-radius: 0;
    z-index: 5;

    &:first-of-type {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    &:last-of-type {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    &:not(:last-of-type) {
      border-right: 0;
    }
  }

  .active {
    --bg: var(--athens);
    --fill: var(--green);
    --border: var(--mystic);

    font-weight: 500;

    & + .btn-2 {
      border-left: 1px solid var(--mystic);
    }
  }
</style>
