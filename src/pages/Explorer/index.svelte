<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import ExplorerCategory from './Category/ExplorerCategory.svelte'
  import Aside from './Aside.svelte'
  import { MenuItem } from './const'

  let activeMenu = MenuItem.NEW
</script>

<div class="row mrg-a mrg--l mrg--r">
  <main>
    <div class="row v-center mrg-xl mrg--b">
      <div
        class="btn-2 row v-center"
        class:active={activeMenu == MenuItem.NEW}
        on:click={() => (activeMenu = MenuItem.NEW)}
      >
        <Svg id="time" w="16" class="mrg-s mrg--r" />
        New
      </div>
      <div
        class="btn-2 row v-center mrg-s mrg--l"
        class:active={activeMenu == MenuItem.LIKES}
        on:click={() => (activeMenu = MenuItem.LIKES)}
      >
        <Svg id="rocket" w="16" class="mrg-s mrg--r" />
        Likes
      </div>

      <div
        class="btn-2 row v-center mrg-a mrg--l"
        class:active={activeMenu == MenuItem.MY_CREATIONS}
        on:click={() => (activeMenu = MenuItem.MY_CREATIONS)}
      >
        <Svg id="user" w="16" class="mrg-s mrg--r" />
        My creations
      </div>
    </div>

    <ExplorerCategory {activeMenu} />
  </main>

  <Aside />
</div>

<style>
  main {
    width: 640px;
  }

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
