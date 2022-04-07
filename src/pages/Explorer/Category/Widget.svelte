<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Category from './Category.svelte'
  import ChartLayoutItem from '../Layouts/ChartLayoutItem.svelte'
  import SocialTrend from '../Layouts/SocialTrend.svelte'
  import WeeklyReport from '../Layouts/WeeklyReport.svelte'
  import SheetsTemplate from '../Layouts/SheetsTemplate.svelte'

  export let title = 'Recent Chart Layouts'
  export let headerLeftIcon = 'info'
  export let type
  export let items = [
    {
      id: 0,
      type: 'chart',
      title: 'Protocol - Fundamental comparison (TVL, User, Develel)',
      comments: 0,
      votes: 0,
      user: { username: 'test' },
      assets: [
        { slug: 'bitcoin' },
        { slug: 'ethereum' },
        { slug: 'bitcoin-cash' },
        { slug: 'bitcoin' },
      ],
    },
  ]
</script>

<Category {title} small iconClass="$style.icon" {items}>
  <svelte:fragment slot="icon">
    <Svg id={headerLeftIcon} w="16" />
  </svelte:fragment>

  <svelte:fragment let:item>
    {#if type === 'social'}
      <SocialTrend {item} />
    {:else if type === 'weekly_report'}
      <WeeklyReport {item} />
    {:else if type === 'sheets_templates'}
      <SheetsTemplate {item} />
    {:else}
      <ChartLayoutItem small {item} />
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="header">
    <slot name="right" />
  </svelte:fragment>
</Category>

<style>
  .icon {
    background: var(--green-light-1);
    fill: var(--green);
  }
</style>
