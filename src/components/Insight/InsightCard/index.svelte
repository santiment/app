<script>
  import { setContext } from 'svelte'
  import InsightCard from 'insights-app/lib/components/insights/InsightCard'
  import { likeInsight } from 'insights-app/lib/logic/likes'
  import { transformLink } from '../helpers'

  export let insight, className
  setContext('likeInsight', likeInsight)
</script>

<InsightCard {insight} {transformLink} class="{className}" />
