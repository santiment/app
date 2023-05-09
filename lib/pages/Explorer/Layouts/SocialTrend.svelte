<script>
  import MiniChart from 'webkit/ui/MiniChart'
  import { trackExplorerSidepanel } from 'webkit/analytics/events/explorer'
  import { trendingWordsVolume } from '../store'

  export let item = {}

  $: ({ word } = item)
  $: wordVolumeData = $trendingWordsVolume[word] || []

  function onClick(e) {
    trackExplorerSidepanel({
      type: 'social_trends',
      action: 'item_click',
    })

    window.__onLinkClick(e)
  }
</script>

<a href="/labs/trends/explore/{word}" on:click={onClick}>
  <div class="row justify v-center mrg--b mrg-s">
    <h5>{word}</h5>

    <MiniChart
      class="$style.chart"
      height={45}
      width={90}
      data={wordVolumeData.slice(0, -1)}
      valueKey="value"
      gradientId="trend-social-volume"
      gradientColor="malibu"
      gradientOpacity="0.7" />
  </div>
</a>

<style lang="scss">
  .chart {
    --color: var(--malibu);
    --chart-fill: url(#trend-social-volume);
  }
</style>
