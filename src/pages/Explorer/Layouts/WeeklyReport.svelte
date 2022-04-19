<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import { dialogs } from 'webkit/ui/Dialog'
  import { userSubscription } from '../store'
  import UpgradeModal from '../Components/UpgradeModal.svelte'

  export let item

  $: isPro = $userSubscription.isPro || false

  const getAction = () => (isPro ? (window.location.href = item.url) : dialogs.show(UpgradeModal))
</script>

<div class="btn row justify v-center" on:click={getAction}>
  <h4>{item.name}</h4>
  <Svg id="download" w="16" />
</div>

<style>
  h4 {
    max-width: 252px;
  }
</style>
