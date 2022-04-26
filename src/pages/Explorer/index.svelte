<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import ExplorerCategory from './Category/ExplorerCategory.svelte'
  import Aside from './Aside.svelte'
  import { currentUser, userSubscription, trendingWords } from './store'
  import { MenuItem } from './const'

  export let user = {}
  export let userSubscriptionData = {}
  export let words = {}

  let activeMenu = MenuItem.NEW
  let loading = true

  $: currentUser.set(user)
  $: userSubscription.set(userSubscriptionData)
  $: trendingWords.set(words)

  function changeMenu(menuItem) {
    if (loading) return
    activeMenu = menuItem
  }
</script>

<main>
  <div class="row v-center mrg-xl mrg--b">
    <div
      class="btn-2 row v-center"
      class:active={activeMenu === MenuItem.NEW}
      class:loading={activeMenu === MenuItem.NEW && loading}
      on:click={() => changeMenu(MenuItem.NEW)}
    >
      <Svg id="time" w="16" class="mrg-s mrg--r" />
      New
    </div>
    <div
      class="btn-2 row v-center mrg-s mrg--l"
      class:active={activeMenu === MenuItem.LIKES}
      class:loading={activeMenu === MenuItem.LIKES && loading}
      on:click={() => changeMenu(MenuItem.LIKES)}
    >
      <Svg id="rocket" w="16" class="mrg-s mrg--r" />
      Likes
    </div>

    <div
      class="btn-2 row v-center mrg-a mrg--l"
      class:active={activeMenu === MenuItem.MY_CREATIONS}
      class:loading={activeMenu === MenuItem.MY_CREATIONS && loading}
      on:click={() => changeMenu(MenuItem.MY_CREATIONS)}
    >
      <Svg id="user" w="16" class="mrg-s mrg--r" />
      My creations
    </div>
  </div>

  <ExplorerCategory {activeMenu} onLoadingChange={(newLoading) => (loading = newLoading)} />
</main>

<Aside class="$style.aside" />

<style>
  main,
  .aside {
    position: sticky;
    align-self: flex-end;
    bottom: 0;
  }

  main {
    width: 640px;
    min-height: 50%;
  }

  .aside {
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
