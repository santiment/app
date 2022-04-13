<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Category from './Category.svelte'
  import LayoutItem from '../Layouts/LayoutItem.svelte'
  import SocialTrend from '../Layouts/SocialTrend.svelte'
  import WeeklyReport from '../Layouts/WeeklyReport.svelte'
  import SheetsTemplate from '../Layouts/SheetsTemplate.svelte'

  export let title = 'Recent Chart Layouts'
  export let icon = 'info'
  export let color = 'green'
  export let iconWidth = 16
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

<Category {title} small {items}>
  <div
    slot="icon"
    style="fill:var(--{color}); background:var(--{color}-light-1)"
    class="$style.icon row hv-center"
  >
    <Svg id={icon} w={iconWidth} />
  </div>

  <svelte:fragment let:item>
    {#if type === 'social'}
      <SocialTrend {item} />
    {:else if type === 'weekly_report'}
      <WeeklyReport {item} />
    {:else if type === 'sheets_templates'}
      <SheetsTemplate {item} />
    {:else}
      <LayoutItem small {item} />
    {/if}
  </svelte:fragment>

  <slot slot="header" name="header" />
</Category>

<style>
  .icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
  }
</style>
