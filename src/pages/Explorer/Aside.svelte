<script>
  import Widget from './Category/Widget.svelte'
  import ExternalLink from './Components/ExternalLink.svelte'
  import LayoutItem from './Layouts/LayoutItem.svelte'
  import SocialTrend from './Layouts/SocialTrend.svelte'
  import WeeklyReport from './Layouts/WeeklyReport.svelte'
  import SheetsTemplate from './Layouts/SheetsTemplate.svelte'
  import { queryExplorerItems } from './api'
  import { EntityType } from './const'

  let className = ''
  export { className as class }

  const PAGE_SIZE = 5
  const getRecentItems = (type, key) => (page) =>
    queryExplorerItems({ types: [type], page, pageSize: PAGE_SIZE }).then(({ pages, items }) => ({
      pages,
      items: items.map((item) => item[key]),
    }))
</script>

<aside class={className}>
  <Widget
    title="Recent Chart Layouts"
    icon="chart"
    let:item
    getItems={getRecentItems(EntityType.CHART.key, 'chartConfiguration')}
  >
    <LayoutItem small {item} />
  </Widget>

  <Widget
    title="Insights"
    icon="insight"
    color="orange"
    iconWidth="14"
    let:item
    getItems={getRecentItems('INSIGHT', 'insight')}
  >
    <ExternalLink href="https://insights.santiment.net/" slot="header" />
    <LayoutItem small {item} />
  </Widget>

  <Widget title="Social trends" icon="social-trend" color="blue" let:item>
    <ExternalLink href="https://app.santiment.net/labs/trends/" slot="header" />
    <SocialTrend {item} />
  </Widget>

  <Widget title="Weekly Reports" icon="report" color="blue" let:item>
    <div slot="header" class="pro row hv-center c-white caption">PRO</div>
    <WeeklyReport {item} />
  </Widget>

  <Widget title="Sheets Templates" icon="social-trend" let:item>
    <div slot="header" class="pro row hv-center c-white caption">PRO</div>
    <SheetsTemplate {item} />
  </Widget>
</aside>

<style>
  aside {
    width: 320px;
    margin-left: 48px;
  }
  .pro {
    width: 40px;
    height: 20px;
    background-color: var(--orange);
    border-radius: 4px;
  }
</style>
