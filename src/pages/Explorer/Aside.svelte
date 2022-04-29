<script>
  import Widget from './Category/Widget.svelte'
  import ExternalLink from './Components/ExternalLink.svelte'
  import LayoutItem from './Layouts/LayoutItem.svelte'
  import SocialTrend from './Layouts/SocialTrend.svelte'
  import WeeklyReport from './Layouts/WeeklyReport.svelte'
  import SheetsTemplate from './Layouts/SheetsTemplate.svelte'
  import { queryExplorerItems, queryReports, queryTemplates } from './api'
  import { EntityKeys } from './const'

  let className = ''
  export { className as class }

  const PAGE_SIZE = 5

  const getRecentItems = (type, key) => (page) =>
    queryExplorerItems({ types: [type], page, pageSize: PAGE_SIZE }).then(({ pages, items }) => ({
      pages,
      items: items.map((item) => item[key]),
    }))

  const getCustomItems = (queryItems) => (page) =>
    queryItems().then((items) => {
      const begin = (page - 1) * PAGE_SIZE
      return {
        pages: Math.ceil(items.length / PAGE_SIZE),
        items: items.slice(begin, begin + PAGE_SIZE),
      }
    })

  const getSocialItems = (page, trends) =>
    new Promise((resolve) => {
      const words = Object.keys(trends)
      const items = words.map((word) => ({
        word,
        tags: trends[word].map(({ word }) => word),
      }))
      const begin = (page - 1) * PAGE_SIZE
      return resolve({
        pages: Math.ceil(words.length / PAGE_SIZE),
        items: items.slice(begin, begin + PAGE_SIZE),
      })
    })
</script>

<aside class={className}>
  <!-- <Widget
    title="Recent Chart Layouts"
    icon="chart"
    let:item
    getItems={getRecentItems(EntityType.CHART.key, 'chartConfiguration')}
  >
    <LayoutItem small {item} />
  </Widget> -->

  <Widget
    title="Insights"
    icon="insight"
    color="orange"
    iconWidth="14"
    let:item
    getItems={getRecentItems(EntityKeys.INSIGHT, 'insight')}
  >
    <ExternalLink href="https://insights.santiment.net/" slot="header" />
    <LayoutItem small {item} type={EntityKeys.INSIGHT} />
  </Widget>

  <Widget title="Social trends" icon="social-trend" color="blue" let:item getItems={getSocialItems}>
    <ExternalLink href="https://app.santiment.net/labs/trends/" slot="header" />
    <SocialTrend {item} />
  </Widget>

  <Widget
    title="Bi-Weekly Reports"
    icon="report"
    color="blue"
    let:item
    getItems={getCustomItems(queryReports)}
  >
    <div slot="header" class="pro row hv-center c-white caption">PRO</div>
    <WeeklyReport {item} />
  </Widget>

  <Widget
    title="Sheets Templates"
    icon="social-trend"
    let:item
    getItems={getCustomItems(queryTemplates)}
  >
    <div slot="header" class="pro row hv-center c-white caption">PRO</div>
    <SheetsTemplate {item} />
  </Widget>
</aside>

<style>
  .pro {
    width: 40px;
    height: 20px;
    background-color: var(--orange);
    border-radius: 4px;
  }
</style>
