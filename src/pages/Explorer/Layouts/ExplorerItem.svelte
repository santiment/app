<script>
  import Pic from 'webkit/ui/Profile/Pic.svelte'
  import Price, {
    queryPriceSincePublication,
  } from 'insights/components/PriceSincePublication.svelte'
  import InsightText from 'insights/components/InsightText.svelte'
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

  let projectData

  $: ({ user, tags, project, publishedAt, pulseText } = item)
  $: if (isTagName && user.username === 'anonymous') isTagName = false
  $: title = item.trigger ? item.trigger.title : item.title ? item.title : ''
  $: description = item.trigger ? item.trigger.description : item.description
  $: type === 'INSIGHT' && project && loadPrice()

  function loadPrice() {
    queryPriceSincePublication(project.slug, publishedAt).then((result) => (projectData = result))
  }
</script>

{#if pulseText}
  <h3 class="body-2 line-clamp mrg-s mrg--b">{title}</h3>
  <InsightText text={pulseText} class="$style.text body-2 mrg-s mrg--b" />
{/if}

<a
  class="row v-center explorerItem"
  class:insightWithAsset={projectData && !pulseText}
  href={url}
  on:click={onClick}
>
  <Pic src={user.avatarUrl} class="mrg-l mrg--r $style.pic" />
  <div class="fluid column">
    {#if !pulseText}
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
    {/if}
    <div class="row v-center justify mrg-m mrg--t" class:noMargin={pulseText}>
      <div class="username c-waterloo">
        {isTagName && user.username ? '@' : ''}{user.username || user.email}
      </div>
      <div class="row v-center">
        <Actions {item} {type} />
      </div>
    </div>
  </div>
  {#if projectData && !pulseText}
    <Price insight={item} {project} {...projectData} width={184} class="$style.price body-3" />
  {/if}
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

  .noMargin {
    margin: 0;
  }

  .insightWithAsset {
    height: 94px;
    padding-right: 206px;
  }

  .price {
    position: absolute;
    right: 0;
    width: 216px;
    height: 126px;
    min-width: 216px;
    padding: 16px;
    background: linear-gradient(180deg, #f7f8f9 0%, rgba(255, 255, 255, 0) 100%);
    text-align: left !important;
  }

  .text {
    --text-h1-size: 18px;
    --text-h2-size: 16px;

    --text-ul-margin: 10px 0 25px;

    --text-figure-mrg-b: 12px;

    --text-quote-size: 16px;
    --text-quote-padding: 12px 20px;
    --text-quote-margin: 12px 0 16px;
    --text-quotes-size: 50px;
  }
</style>
