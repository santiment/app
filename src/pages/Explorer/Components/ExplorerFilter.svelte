<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import { trackExplorerFiltersUse } from 'webkit/analytics/events/explorer'
  import { MenuItem } from '../const'

  export let loading = false
  export let activeMenu

  function onFilterClick(filter) {
    if (loading) return

    activeMenu = filter
    trackExplorerFiltersUse(filter)
  }
</script>

<div class="wrapper row hv-center mrg--b mrg-xl">
  <div
    class="btn-2 row v-center"
    class:active={activeMenu === MenuItem.TRENDING}
    class:loading={activeMenu === MenuItem.TRENDING && loading}
    on:click={() => onFilterClick(MenuItem.TRENDING)}>
    <Svg id="fire" w="16" class="mrg--r" />
    Trending
  </div>
  <div
    class="btn-2 row v-center"
    class:active={activeMenu === MenuItem.NEW}
    class:loading={activeMenu === MenuItem.NEW && loading}
    on:click={() => onFilterClick(MenuItem.NEW)}>
    <Svg id="time" w="16" class="mrg--r" />
    New
  </div>
  <div
    class="btn-2 row v-center"
    class:active={activeMenu === MenuItem.SANTIMENT}
    class:loading={activeMenu === MenuItem.SANTIMENT && loading}
    on:click={() => onFilterClick(MenuItem.SANTIMENT)}>
    <Svg id="santiment" w="16" class="mrg--r" />
    By Santiment
  </div>
  <div
    class="btn-2 row v-center"
    class:active={activeMenu === MenuItem.MY_CREATIONS}
    class:loading={activeMenu === MenuItem.MY_CREATIONS && loading}
    on:click={() => onFilterClick(MenuItem.MY_CREATIONS)}>
    <Svg id="user" w="16" class="mrg--r" />
    My creations
  </div>
  <div
    class="btn-2 row v-center"
    class:active={activeMenu === MenuItem.LIKES}
    class:loading={activeMenu === MenuItem.LIKES && loading}
    on:click={() => onFilterClick(MenuItem.LIKES)}>
    <Svg id="rocket" w="16" class="mrg--r" />
    My likes
  </div>
</div>

<style lang="scss">
  .btn-2 {
    --margin: 6px;
    padding: 9px 15px;
    --fill: var(--waterloo);
    border-radius: 0;

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
