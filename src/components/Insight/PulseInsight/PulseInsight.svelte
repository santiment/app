<script>
  import { setContext } from 'svelte'
  import SveltePulseInsight from 'insights-app/lib/components/insights/PulseCard'
  import { toggleInsightLike } from './utils'

  export let insight, className
  setContext('toggleInsightLike', toggleInsightLike)
</script>

<SveltePulseInsight {insight} class="{className}" />
