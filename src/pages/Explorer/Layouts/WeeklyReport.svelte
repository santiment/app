<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import { userSubscription } from '../store'
  import { showUpgradeDialog } from '../Components/UpgradeDialog.svelte'

  export let item

  $: isPro = $userSubscription.isPro || false

  const getAction = () => (isPro ? (window.location.href = item.url) : showUpgradeDialog())
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
