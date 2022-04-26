<script>
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import Svg from 'webkit/ui/Svg/svelte'
  import Product from 'webkit/ui/Product.svelte'
  import Products from 'webkit/ui/Products/svelte'
  import AccountStatus from 'webkit/ui/AccountStatus.svelte'
  import AccountDropdown from 'webkit/ui/AccountDropdown/index.svelte'

  export let currentUser = null
  export let ui = writable({})
  export let mount

  let searchNode
  let notificationsNode

  function onLogoutClick() {}

  onMount(() => {
    mount(searchNode, notificationsNode)
  })
</script>

<header class="row v-center">
  <Product title="Sanbase" class="mrg-l mrg--r" />
  <Products
    active="sanbase"
    isCompact
    isColumn
    class="mrg-xxl mrg--r"
    tooltipClassName="$style.dropdown" />

  <a href="https://santiment.net/discord" class="discord btn-1 btn--s row v-center nowrap">
    <Svg id="discord" w="16" h="12" class="mrg-s mrg--r" />
    Join us!</a>

  <div class="search fluid mrg-a mrg--l" bind:this={searchNode} />

  <a href="https://academy.santiment.net/" class="btn mrg-a mrg--l">Academy</a>
  <a href="/pricing" class="btn mrg-l mrg--l" on:click={window.__onLinkClick}>Pricing</a>

  <div class="notifications mrg-xl mrg--l" bind:this={notificationsNode} />

  <div class="br mrg-xl mrg--r" />

  <AccountStatus {currentUser} />
  <AccountDropdown {currentUser} {ui} {onLogoutClick} tooltipClass="$style.dropdown" />
</header>

<style>
  header {
    height: 64px;
    border-bottom: 1px solid var(--porcelain);
    background: var(--white);
    padding: 16px 24px;
  }

  .dropdown {
    z-index: 30 !important;
  }

  .search {
    max-width: 360px;
  }

  a {
    --color: var(--waterloo);
    --color-hover: var(--green);
  }

  .discord {
    background: var(--purple-light-1);
    --color: var(--purple);
    --color-hover: var(--purple-hover);
  }

  .br {
    width: 1px;
    height: 100%;
    background: var(--porcelain);
  }
</style>
