import toReact from 'svelte-adapter/react'
import SvelteInsightCard from 'insights/components/InsightCard/index.svelte'
import SveltePulseCard from 'insights/components/InsightCard/Pulse.svelte'

export const InsightCard = toReact(SvelteInsightCard, {}, 'div')
export const PulseInsight = toReact(SveltePulseCard, {}, 'div')
