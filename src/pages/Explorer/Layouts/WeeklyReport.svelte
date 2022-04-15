<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import {userSubscription} from '../store'
  import UpgradeModal from '../Components/UpgradeModal.svelte'

  export let item
  let showUpgradeModal = false;
  
  $: isPro = $userSubscription.isPro || false
</script>

{#if showUpgradeModal}
  <UpgradeModal />
{/if}

<div class="row justify v-center">
  <h4>
    {item.name}
  </h4>
  {#if isPro}
    <a href={item.url} download>
      <Svg id="download" w="16" />
    </a>
  {:else}
    <Svg id="download" w="16" on:click={() => showUpgradeModal = true} />
  {/if}
</div>

<style>
  h4 {
    max-width: 252px;
  }
</style>