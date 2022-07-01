<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import { MenuItem } from '../const'

  export let loading = false
  export let activeMenu = MenuItem.NEW
</script>

<div class="row v-center mrg-xl mrg--b">
  <div
    class="btn-2 row v-center mrg-s mrg--r"
    class:active={activeMenu === MenuItem.NEW}
    class:loading={activeMenu === MenuItem.NEW && loading}
    on:click={() => !loading && (activeMenu = MenuItem.NEW)}
  >
    <Svg id="time" w="16" class="mrg-s mrg--r" />
    New
  </div>
  <div
    class="btn-2 row v-center"
    class:active={activeMenu === MenuItem.SANTIMENT}
    class:loading={activeMenu === MenuItem.SANTIMENT && loading}
    on:click={() => !loading && (activeMenu = MenuItem.SANTIMENT)}
  >
    <Svg id="santiment" w="16" class="mrg-s mrg--r" />
    By Santiment
  </div>
  <div class="row v-center mrg-a mrg--l">
    <div
      class="btn-2 row v-center mrg-s mrg--r"
      class:active={activeMenu === MenuItem.LIKES}
      class:loading={activeMenu === MenuItem.LIKES && loading}
      on:click={() => !loading && (activeMenu = MenuItem.LIKES)}
    >
      <Svg id="rocket" w="16" class="mrg-s mrg--r" />
      My likes
    </div>
    <div
      class="btn-2 row v-center"
      class:active={activeMenu === MenuItem.MY_CREATIONS}
      class:loading={activeMenu === MenuItem.MY_CREATIONS && loading}
      on:click={() => !loading && (activeMenu = MenuItem.MY_CREATIONS)}
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
