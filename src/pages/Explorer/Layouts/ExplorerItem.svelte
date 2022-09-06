<script>
  import Pic from 'webkit/ui/Profile/Pic.svelte'
  import Svg from 'webkit/ui/Svg/svelte'
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
  let pulseInsightHeight = 0
  let showShowReadMore = false

  $: ({ user, project, publishedAt, pulseText } = item)
  $: if (isTagName && user.username === 'anonymous') isTagName = false
  $: title = item.trigger ? item.trigger.title : item.title ? item.title : ''
  $: description = item.trigger ? item.trigger.description : item.description
  $: type === 'INSIGHT' && project && loadPrice()
  $: if (pulseInsightHeight >= 400) showShowReadMore = true

  function loadPrice() {
    queryPriceSincePublication(project.slug, publishedAt).then((result) => (projectData = result))
  }
</script>

<a class="column explorerItem" href={url} on:click={onClick}>
  {#if pulseText}
    <div
      class="relative mrg-s mrg--b"
      bind:clientHeight={pulseInsightHeight}
      class:showShowReadMore
    >
      <div class="pulseHeader row v-center">
        <h3 class="pulseTitle body-2 nowrap line-clamp mrg-s mrg--b">{title}</h3>
        <div class="insightTag row v-center txt-m mrg-a mrg--l">
          <Svg id="insight" w="16" class="mrg-s mrg--r" />
          Insights
        </div>
      </div>
      <InsightText text={pulseText} class="$style.text body-2" />
      {#if showShowReadMore}
        <div class="readMore fluid row h-center">
          <button class="btn-2">Read more</button>
        </div>
      {/if}
    </div>
  {/if}

  <section class="row v-center" class:insightWithAsset={projectData && !pulseText}>
    <Pic src={user.avatarUrl} class="mrg-l mrg--r $style.pic" />
    <div class="fluid column">
      {#if !pulseText}
        <div class="row v-center nowrap">
          <h3 class="body-2 mrg-l mrg--r line-clamp" class:ellipsisText={projectData && !pulseText}>
            {title}
          </h3>
          {#if hasIcons}
            <AssetIcons assets={assets.filter((asset) => asset.slug)} />
          {:else}
            <AssetTags tags={assets} />
          {/if}
          {#if type === 'INSIGHT'}
            <div class="insightTag row v-center txt-m mrg-a mrg--l">
              <Svg id="insight" w="16" class="mrg-s mrg--r" />
              Insights
            </div>
          {/if}
        </div>

        {#if description}
          <p class="c-waterloo mrg-xs mrg--t" class:ellipsisText={projectData && !pulseText}>
            {description}
          </p>
        {/if}
      {/if}
      <div class="row v-center justify mrg-m mrg--t" class:noMargin={pulseText}>
        <div
          class="username c-waterloo nowrap line-clamp"
          class:ellipsisText={projectData && !pulseText}
        >
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
  </section>
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

  .ellipsisText {
    display: block;
    max-width: 240px;
  }

  .insightWithAsset {
    height: 94px;
    margin-right: 206px;
  }

  .pulseHeader {
    gap: 24px;
  }

  .pulseTitle {
    display: block;
  }

  .showShowReadMore {
    height: 400px;
    overflow: hidden;
  }

  .readMore {
    --bg: var(--white);
    height: 56px;
    position: absolute;
    align-items: flex-end;
    bottom: 0;
    background: linear-gradient(360deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  }

  .btn-2 {
    --v-padding: 6px;
    --h-padding: 12px;
  }

  .insightTag {
    border-radius: 6px;
    padding: 6px 12px;
    background-color: var(--green-light-1);
    fill: var(--green);
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
