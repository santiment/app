<script context="module">
  import { dialogs } from 'webkit/ui/Dialog'
  import UpgradeModal from './UpgradeModal.svelte'

  export const showUpgradeModal = () => dialogs.show(UpgradeModal)

  const HEAD = 'Sanbase Pro includes advanced features and access to the full Santiment platform!'

  const FEATURS = [
    'Review our latest premium reports about crypto activity in the market',
    'Check collection of trading and research models built with SanSheets, a plugin that lets you directly import Santiment’s data into Google Spreadsheets. Popular PRO templates include Price-DAA divergence, MVRV comparison model, NVT ratio and more.',
    'Full access to all Santiment metrics and market insights',
  ]
</script>

<script>
  import Dialog from 'webkit/ui/Dialog'

  let closeDialog
</script>

<Dialog {...$$props} bind:closeDialog class="$style.upgradeModal">
  <div class="body-1" slot="title">Upgrade to Pro for full access!</div>

  <div class="dialog-body column">
    <div class="body-2 head">{HEAD}</div>
    <ul class="mrg--b mrg-l">
      {#each FEATURS as feature}
        <li class="row v-center body-2 mrg--b mrg-m"><p>{feature}</p></li>
      {/each}
    </ul>
    <div class="mrg--b mrg-m">
      <a class="btn-1 btn--orange mrg--r mrg-l" href="/pricing">Upgrade to Pro</a>
      <button class="btn-2" on:click={closeDialog}>Cancel</button>
    </div>
  </div>
</Dialog>

<style>
  .upgradeModal {
    background-color: var(--athens);
  }

  .dialog-body {
    width: 612px;
    border-radius: 8px;
    background-color: var(--white);
    padding-bottom: 12px;
    margin-bottom: 0;
  }

  .head {
    margin-top: 12px;
    margin-bottom: 24px;
  }

  li {
    position: relative;
    color: var(--fiord);
    width: 510px;
  }

  li::before {
    content: '';
    position: absolute;
    border-radius: 50%;
    background-color: var(--mystic);
    width: 6px;
    height: 6px;
    margin-right: 16px;
  }

  a {
    display: inline-block;
  }

  p {
    margin-left: 12px;
  }
</style>
