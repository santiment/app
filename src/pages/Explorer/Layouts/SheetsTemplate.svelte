<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import { trackExplorerSidepanel } from 'webkit/analytics/events/explorer'
  import { userSubscription } from '../store'
  import { showUpgradeDialog } from '../Components/UpgradeDialog.svelte'

  export let item = {}

  let isOpen = false

  $: ({ description, name, url } = item)
  $: isPro = $userSubscription.isPro || false

  function onOpenTemplateClick(e) {
    trackExplorerSidepanel({
      type: 'sheets_templates',
      action: 'item_click',
      error: isPro ? undefined : 'free_user',
    })

    if (isPro) return

    e.preventDefault()
    showUpgradeDialog()
  }
</script>

<div on:click={() => (isOpen = !isOpen)}>
  <div class="row justify v-center">
    <h5>{name}</h5>
    <Svg id="arrow-down" w="10" height="5.5" class="$style.arrow {isOpen && '$style.open'}" />
  </div>
  {#if isOpen}
    <div class="mrg-l mrg--t mrg--b description">
      <p class="mrg-s mrg--b">
        {description}
      </p>

      <a
        href={url}
        target="_blank"
        class="btn-1 btn--s row v-center"
        on:click={onOpenTemplateClick}>
        <div class="mrg-s mrg--r">Open template</div>
        <Svg id="external-link" w="12" />
      </a>
    </div>
  {/if}
</div>

<style>
  .description {
    padding: 12px 16px;
    background: var(--athens);
    border-radius: 4px;
  }

  a {
    width: 141px;
  }

  .open {
    transform: rotate(180deg);
  }
</style>
