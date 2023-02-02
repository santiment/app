<script>
  import Widget from './Category/Widget.svelte'
  import ExternalLink from './Components/ExternalLink.svelte'
  import SocialTrend from './Layouts/SocialTrend.svelte'
  import WeeklyReport from './Layouts/WeeklyReport.svelte'
  import SheetsTemplate from './Layouts/SheetsTemplate.svelte'
  import { queryReports, queryTemplates } from './api'

  let className = ''
  export { className as class }

  const PAGE_SIZE = 5

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
      const begin = (page - 1) * PAGE_SIZE
      return resolve({
        pages: Math.ceil(trends.length / PAGE_SIZE),
        items: trends.slice(begin, begin + PAGE_SIZE),
      })
    })
</script>

<aside class="relative {className}">
  <Widget title="Social trends" icon="social-trend" color="blue" let:item getItems={getSocialItems}>
    <ExternalLink href="/dashboards" slot="header" />
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

<style lang="scss">
  .pro {
    width: 40px;
    height: 20px;
    background-color: var(--orange);
    border-radius: 4px;
  }
</style>
