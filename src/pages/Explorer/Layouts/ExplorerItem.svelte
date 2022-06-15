<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Profile from 'webkit/ui/Profile/svelte'
  import Tooltip from 'webkit/ui/Tooltip/svelte'
  import Info from 'webkit/ui/Profile/Info.svelte'
  import AssetIcons from '../Components/AssetIcons.svelte'
  import AssetTags from '../Components/AssetTags.svelte'
  import Actions from '../Components/Actions.svelte'
  import { mutateStoreUserActivity, InteractionType } from '../../../queries/userActivity'
  import { currentUser } from '../store'
  import { history } from '../../../redux'
  import { EntityType, getItemRoute } from '../const'

  export let item
  export let type = 'CHART'
  export let url
  export let hasIcons = false
  export let assets = []

  const ACTION_BUTTON_CLASS = 'actionbutton'

  $: ({ user } = item)
  $: title = item.trigger ? item.trigger.title : item.title ? item.title : ''
  $: description = item.trigger ? item.trigger.description : item.description

  function onClick(e) {
    const isIcon = e.target && ['use', 'svg'].includes(e.target.tagName)
    const isActionButton =
      e.target.classList.contains(ACTION_BUTTON_CLASS) ||
      (e.target.parentElement && e.target.parentElement.classList.contains(ACTION_BUTTON_CLASS))
    if (isIcon || isActionButton) {
      e.preventDefault()
      return
    }
    if (url.includes(location.hostname)) {
      e.preventDefault()
      mutateStoreUserActivity(type, item.trigger ? item.trigger.id : item.id, InteractionType.VIEW)
      history.push(getItemRoute(item, type))
      return
    }
  }
</script>

<a class="explorerItem" href={url} on:click={onClick}>
  <div class="row v-center line1">
    <div
      class="row hv-center mrg-m mrg--r itemicon"
      style="fill: {EntityType[type].color}; background: {EntityType[type].backgroundColor};"
    >
      <Svg id={EntityType[type].icon} w="16" />
    </div>
    <div class="row nowrap v-center">
      <h3 class="body-2 mrg-l mrg--r">
        {title}
      </h3>
      {#if hasIcons}
        <AssetIcons assets={assets.filter((asset) => asset.slug)} />
      {:else}
        <AssetTags tags={assets} />
      {/if}
    </div>
  </div>

  {#if description}
    <div class="row line2 c-waterloo">
      {description}
    </div>
  {/if}

  <div class="row line2 mrg-l mrg--t v-center justify">
    <Tooltip openDelay={110}>
      <svelte:fragment slot="trigger">
        <Profile {user} class="author" />
      </svelte:fragment>

      <svelte:fragment slot="tooltip">
        <Info {user} currentUser={$currentUser} />
      </svelte:fragment>
    </Tooltip>
    <div class="row v-center">
      <Actions {item} {type} />
    </div>
  </div>
</a>

<style>
  .explorerItem:hover h3 {
    color: var(--green);
  }

  .itemicon {
    width: 24px;
    height: 24px;
    border-radius: 4px;
  }

  .line1 {
    margin-bottom: 6px;
  }

  .line2 {
    margin-left: 36px;
  }
</style>
