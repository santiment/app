<script lang="ts">
  import Svg from 'webkit/ui/Svg/svelte'
  import MenuItems, { visibleMenus } from '../menu.ts'
  import type { MenuItem } from '../menu.ts'

  export let loading = false
  export let activeMenu: MenuItem = MenuItems.New
</script>

<div class="row v-center mrg-xl mrg--b">
  {#each visibleMenus as visibleMenu}
    <div
      class="btn-2 row v-center mrg-s mrg--r"
      class:active={activeMenu.is(visibleMenu.name)}
      class:loading={activeMenu.is(visibleMenu.name) && loading}
      on:click={() => !loading && (activeMenu = visibleMenu)}
    >
      <Svg id={visibleMenu.svg} w="16" class="mrg-s mrg--r" />
      {visibleMenu.getMenuTitle()}
    </div>
  {/each}
  <div
    class="btn-2 row v-center mrg-s mrg--r"
    class:active={activeMenu.is('New')}
    class:loading={activeMenu.is('New') && loading}
    on:click={() => !loading && (activeMenu = MenuItems.NEW)}
  >
    <Svg id="time" w="16" class="mrg-s mrg--r" />
    New
  </div>
  <div
    class="btn-2 row v-center"
    class:active={activeMenu.is('Santiment')}
    class:loading={activeMenu.is('Santiment') && loading}
    on:click={() => !loading && (activeMenu = MenuItems.Santiment)}
  >
    <Svg id="santiment" w="16" class="mrg-s mrg--r" />
    By Santiment
  </div>
  <div class="row v-center mrg-a mrg--l">
    <div
      class="btn-2 row v-center mrg-s mrg--r"
      class:active={activeMenu.is('Likes')}
      class:loading={activeMenu.is('Likes') && loading}
      on:click={() => !loading && (activeMenu = MenuItems.Likes)}
    >
      <Svg id="rocket" w="16" class="mrg-s mrg--r" />
      My likes
    </div>
    <div
      class="btn-2 row v-center"
      class:active={activeMenu.is('My creations')}
      class:loading={activeMenu.is('My creations') && loading}
      on:click={() => !loading && (activeMenu = MenuItems.MyCreations)}
    >
      <Svg id="user" w="16" class="mrg-s mrg--r" />
      My creations
    </div>
  </div>
</div>

<style lang="scss">
  .btn-2 {
    border-radius: 100px;
    padding: 10px 16px 10px 12px;
    --color: var(--waterloo);
  }

  .active {
    --color: var(--green);
    --border: var(--green);
    --bg: var(--green-light-1);
  }
</style>
