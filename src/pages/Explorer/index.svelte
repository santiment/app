<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import ExplorerCategory from './Category/ExplorerCategory.svelte'
  import RecentChartLayoutsCategory from './Category/RecentChartLayoutsCategory.svelte'
</script>

<div class="row mrg-a mrg--l mrg--r">
  <main>
    <div class="row v-center mrg-xl mrg--b">
      <div class="btn-2 row v-center">New</div>
      <div class="btn-2 row v-center mrg-s mrg--l" class:active={true}>
        <Svg id="rocket" w="13.5" h="18" class="mrg-s mrg--r" />
        Likes
      </div>

      <div class="btn-2 row v-center mrg-a mrg--l">My creations</div>
    </div>

    <ExplorerCategory />
  </main>

  <aside>
    <RecentChartLayoutsCategory />
  </aside>
</div>

<style>
  main {
    width: 640px;
  }

  aside {
    width: 320px;
    margin-left: 48px;
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
