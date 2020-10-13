<script>
  import { setContext } from 'svelte'
  import InsightCardWithMarketcap from 'insights-app/lib/components/insights/InsightCardWithMarketcap'
  import { likeInsight } from 'insights-app/lib/logic/likes'
  import { getInsightChartProjectData } from 'insights-app/lib/logic/projects'
  import { transformLink } from '../helpers'

  export let insight, className
  setContext('likeInsight', likeInsight)
  setContext('getInsightChartProjectData', getInsightChartProjectData)
</script>

<InsightCardWithMarketcap {insight} {transformLink} class="{className}" />
