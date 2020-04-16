<script>
  import { setContext } from 'svelte'
  import SveltePulseInsight from 'insights-app/lib/components/insights/PulseCard'
  import { toggleInsightLike, transformLink } from './utils'

  export let insight, className
  setContext('toggleInsightLike', toggleInsightLike)
</script>

<SveltePulseInsight {insight} {transformLink} class="{className}" />
