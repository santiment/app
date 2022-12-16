<script>
  import ExplorerCategory from './Category/ExplorerCategory.svelte'
  import ExplorerFilter from './Components/ExplorerFilter.svelte'
  import Aside from './Aside.svelte'
  import { currentUser, userSubscription } from './store'
  import { MenuItem } from './const'

  export let user = {}
  export let userSubscriptionData = {}

  let activeMenu = MenuItem.TRENDING
  let loading = true

  $: currentUser.set(user)
  $: userSubscription.set(userSubscriptionData)
</script>

<main>
  <ExplorerFilter bind:activeMenu {loading} />
  <ExplorerCategory bind:activeMenu onLoadingChange={(newLoading) => (loading = newLoading)} />
</main>

<Aside class="$style.aside" />

<style>
  main,
  .aside {
    position: relative;
    align-self: flex-end;
    bottom: 0;
    padding-top: 10px;
    min-height: 100vh;
  }

  .aside {
    position: sticky;
  }

  :global(.tablet) .aside {
    /* TODO: removed component using js */
    display: none;
  }
  @media screen and (max-width: 1260px) {
    .aside {
      display: none;
    }
  }

  main {
    width: 720px;
  }

  .aside {
    width: 344px;
    margin-left: 40px;
  }
</style>
