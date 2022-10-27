<script>
  import ExplorerCategory from './Category/ExplorerCategory.svelte'
  import ExplorerFilter from './Components/ExplorerFilter.svelte'
  import Aside from './Aside.svelte'
  import { currentUser, userSubscription } from './store'
  import { MenuItem } from './const'
  import netTop from '../../assets/halloween/net-top.svg'
  import netBottom from '../../assets/halloween/net-bottom.svg'

  export let user = {}
  export let userSubscriptionData = {}

  let activeMenu = MenuItem.TRENDING
  let loading = true

  $: currentUser.set(user)
  $: userSubscription.set(userSubscriptionData)
</script>

<img src={netTop} alt="Net" class="net-top" />
<img src={netBottom} alt="Net" class="net-bottom" />

<main>
  <ExplorerFilter bind:activeMenu {loading} />
  <ExplorerCategory bind:activeMenu onLoadingChange={(newLoading) => (loading = newLoading)} />
</main>

<Aside class="$style.aside" />

<style>
  main,
  .aside {
    position: sticky;
    align-self: flex-end;
    bottom: 0;
    padding-top: 10px;
    min-height: 100vh;
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

  .net-top {
    position: absolute;
    top: 64px;
    left: 120px;
  }

  .net-bottom {
    position: fixed;
    bottom: -20px;
    right: 0;
  }
</style>
