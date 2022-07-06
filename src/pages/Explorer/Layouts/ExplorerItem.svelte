<script>
  import Pic from 'webkit/ui/Profile/Pic.svelte'
  import AssetIcons from '../Components/AssetIcons.svelte'
  import AssetTags from '../Components/AssetTags.svelte'
  import Actions from '../Components/Actions.svelte'

  export let item
  export let type = 'CHART'
  export let url
  export let hasIcons = false
  export let assets = []
  export let onClick = () => {}
  export let isTagName = true

  $: ({ user } = item)
  $: if (isTagName && user.username === 'anonymous') isTagName = false
  $: title = item.trigger ? item.trigger.title : item.title ? item.title : ''
  $: description = item.trigger ? item.trigger.description : item.description
</script>

<a class="row v-center explorerItem" href={url} on:click={onClick}>
  <Pic src={user.avatarUrl} class="mrg-l mrg--r $style.pic" />
  <div class="fluid column">
    <div class="row v-center nowrap">
      <h3 class="body-2 mrg-l mrg--r">
        {title}
      </h3>
      {#if hasIcons}
        <AssetIcons assets={assets.filter((asset) => asset.slug)} />
      {:else}
        <AssetTags tags={assets} />
      {/if}
    </div>

    {#if description}
      <div class="c-waterloo mrg-xs mrg--t">
        {description}
      </div>
    {/if}

    <div class="row v-center justify mrg-m mrg--t">
      <div class="username c-waterloo">
        {isTagName && user.username ? '@' : ''}{user.username || user.email}
      </div>
      <div class="row v-center">
        <Actions {item} {type} />
      </div>
    </div>
  </div>
</a>

<style lang="scss">
  .explorerItem:hover {
    .pic {
      border: 1px solid var(--green);
    }
    .username {
      color: var(--green);
    }
    h3 {
      color: var(--green);
    }
  }

  .pic {
    --img-size: 40px;
  }
</style>
