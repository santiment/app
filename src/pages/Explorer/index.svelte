<script lang="ts" context="module">
  export enum ExplorerFilterType {
    First,
    Second,
  }
</script>

<script>
  import ExplorerCategory from './Category/ExplorerCategory.svelte'
  import ExplorerFilter from './Components/ExplorerFilter.svelte'
  import ExplorerFilterOld from './Components/ExplorerFilterOld.svelte'
  import Aside from './Aside.svelte'
  import { currentUser, userSubscription } from './store'
  import { MenuItem } from './const'

  export let user = {}
  export let userSubscriptionData = {}
  export let variant = ExplorerFilterType.Second

  let activeMenu = MenuItem.NEW
  let loading = true

  $: currentUser.set(user)
  $: userSubscription.set(userSubscriptionData)
</script>

<main>
  {#if ExplorerFilterType.First}
    <ExplorerFilterOld bind:activeMenu {loading} />
  {/if}
  {#if ExplorerFilterType.Second}
    <ExplorerFilter bind:activeMenu {loading} />
  {/if}

  <ExplorerCategory {activeMenu} onLoadingChange={(newLoading) => (loading = newLoading)} />
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
</style>
