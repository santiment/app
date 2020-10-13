<script>
  import { setContext } from 'svelte'
  import PulseInsight from 'insights-app/lib/components/insights/PulseCard'
  import { likeInsight } from 'insights-app/lib/logic/likes'
  import { transformLink } from '../helpers'

  export let insight, className
  setContext('likeInsight', likeInsight)
</script>

<PulseInsight {insight} {transformLink} class="{className}" />
