<script>
  import { onMount } from 'svelte'
  import { customerData$ } from 'webkit/stores/user'
  import { subscription$ } from 'webkit/stores/subscription'
  import { track } from 'webkit/analytics'
  import Svg from 'webkit/ui/Svg/svelte'
  import Product from 'webkit/ui/Product.svelte'
  import Products from 'webkit/ui/Products/svelte'
  import AccountStatus, { AccountStatusType } from 'webkit/ui/AccountStatus.svelte'
  import AccountDropdown from 'webkit/ui/AccountDropdown/index.svelte'
  import { ui } from '@/stores/ui/theme'
  import { history } from '@/redux'

  export let currentUser = null
  export let mount
  export let isAppUpdateAvailable = false
  export let variant = AccountStatusType.First

  let searchNode
  let notificationsNode

  function onLogoutClick() {
    history.push('/logout')

    subscription$.clear()
    customerData$.clear()
  }

  onMount(() => {
    mount(searchNode, notificationsNode)
  })

  $: subscription = currentUser && currentUser.subscription
  $: customerData = $customerData$
</script>

<header class="row v-center relative">
  <Product title="Sanbase" class="mrg-l mrg--r" />
  <Products
    active="sanbase"
    isCompact
    isColumn
    class="mrg-xxl mrg--r $style.hover"
    tooltipClass="$style.dropdown"
  />

  <a
    href="https://santiment.net/discord"
    class="discord btn-1 btn--s row v-center nowrap"
    on:click={() => track.event('navbar_discord_join_us_clicked')}
  >
    <Svg id="discord" w="16" h="12" class="mrg-s mrg--r" />
    Join us!</a
  >

  <div class="search fluid mrg-a mrg--l" bind:this={searchNode} />

  <a href="https://academy.santiment.net/" class="btn-ghost mrg-a mrg--l">Academy</a>
  <a href="/pricing" class="btn-ghost mrg-l mrg--l" on:click={window.__onLinkClick}>Pricing</a>

  <div class="notifications mrg-s mrg--l" bind:this={notificationsNode} />

  <div class="br mrg-xl mrg--r" />

  <AccountStatus {currentUser} {variant} {subscription} {customerData} />
  <AccountDropdown
    {currentUser}
    {ui}
    {onLogoutClick}
    tooltipClass="$style.dropdown"
    version={process.env.REACT_APP_VERSION}
    {isAppUpdateAvailable}
    {variant}
    {subscription}
    {customerData}
    isShowingFollowers={false}
  />
</header>

<style>
  header {
    height: 64px;
    border-bottom: 1px solid var(--porcelain);
    background: var(--white);
    padding: 16px 24px;
    z-index: 30;
  }

  .dropdown {
    z-index: 30 !important;
  }

  .hover {
    padding: 6px 8px;
    --bg-hover: var(--green-light-1);
  }

  .search {
    max-width: 360px;
  }

  a {
    --color: var(--waterloo);
    --color-hover: var(--green);
    --bg-hover: var(--green-light-1);
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

  :global(.more) {
    max-width: 256px;
  }
</style>
