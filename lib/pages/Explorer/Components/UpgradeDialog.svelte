<script context="module">
  import { dialogs } from 'webkit/ui/Dialog'
  import UpgradeDialog from './UpgradeDialog.svelte'

  export const showUpgradeDialog = () => dialogs.show(UpgradeDialog)

  const FEATURS = [
    'Review our latest premium reports about crypto activity in the market',
    'Check collection of trading and research models built with SanSheets, a plugin that lets you directly import Santiment’s data into Google Spreadsheets. Popular PRO templates include Price-DAA divergence, MVRV comparison model, NVT ratio and more.',
    'Full access to all Santiment metrics and market insights',
  ]
</script>

<script>
  import Dialog from 'webkit/ui/Dialog'
  import Svg from 'webkit/ui/Svg/svelte'

  let closeDialog
</script>

<Dialog {...$$props} noTitle bind:closeDialog class="$style.upgradeModal">
  <div class="header body-1 txt-m row v-center justify">
    Upgrade to Pro for full access!
    <Svg id="close" w="12" on:click={closeDialog} class="btn" />
  </div>

  <div class="dialog body-2">
    <div class="mrg-l mrg--b">
      Sanbase Pro includes advanced features and access to the full Santiment platform!
    </div>

    <ul>
      {#each FEATURS as feature}
        <li class="row mrg-m mrg--t">
          <div class="dot mrg-m mrg--r" />
          <p>{feature}</p>
        </li>
      {/each}
    </ul>

    <div class="mrg-xxl mrg--t row body-3">
      <a class="btn-1 btn--orange mrg--r mrg-l" href="/pricing" on:click={window.__onLinkClick}
        >Upgrade to Pro</a
      >

      <button class="btn-2" on:click={closeDialog}>Cancel</button>
    </div>
  </div>
</Dialog>

<style>
  .dialog {
    padding: 24px 32px;
    background: var(--white);
    width: 612px;
  }

  .header {
    padding: 20px 42px 20px 32px;
    background: var(--athens);
    border-bottom: 1px solid var(--porcelain);
    --fill: var(--waterloo);
    --fill-hover: var(--green);
  }

  ul {
    color: var(--fiord);
  }

  .dot {
    border-radius: 50%;
    background: var(--mystic);
    width: 6px;
    height: 6px;
    min-width: 6px;
    margin-top: 10px;
  }
</style>
