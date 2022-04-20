<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import UserCreation from '../Category/UserCreation.svelte'
  import AssetIcons from '../Components/AssetIcons.svelte'
  import AssetTags from '../Components/AssetTags.svelte'
  import { EntityType, getItemUrl } from '../const'

  export let small = false
  export let item
  export let type = 'ALERT'
  export let showActions = false
  export let hasIcons = false
  export let assets = []
</script>

<UserCreation {item} {small} {type} {showActions} url={getItemUrl(item, type)}>
  {#if !small}
    {#if hasIcons}
      <AssetIcons {assets} />
    {:else}
      <AssetTags tags={assets} />
    {/if}
    <div class="type row v-center mrg-a mrg--l" style="fill: {EntityType[type].color}">
      <Svg id={EntityType[type].icon} w="16" />
    </div>
  {/if}
</UserCreation>

<style>
  .type {
    fill: var(--green);
  }
</style>
