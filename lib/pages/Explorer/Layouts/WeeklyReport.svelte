<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import { trackExplorerSidepanel } from 'webkit/analytics/events/explorer'
  import { userSubscription } from '../store'
  import { showUpgradeDialog } from '../Components/UpgradeDialog.svelte'

  export let item

  $: isPro = $userSubscription.isPro || false

  function getAction(e) {
    trackExplorerSidepanel({
      type: 'bi_weekly_reports',
      action: 'item_click',
      error: isPro ? undefined : 'free_user',
    })

    if (isPro) return

    e.preventDefault()
    showUpgradeDialog()
  }
</script>

<a
  href={isPro ? item.url : '/'}
  target="_blank"
  rel="noopener noreferrer"
  class="btn row justify v-center"
  on:click={getAction}>
  <h4>{item.name}</h4>
  <Svg id="download" w="16" />
</a>

<style>
  h4 {
    max-width: 252px;
  }
</style>
