<script>
  import Widget from './Category/Widget.svelte'
  import ExternalLink from './Components/ExternalLink.svelte'
  import LayoutItem from './Layouts/LayoutItem.svelte'
  import SocialTrend from './Layouts/SocialTrend.svelte'
  import WeeklyReport from './Layouts/WeeklyReport.svelte'
  import SheetsTemplate from './Layouts/SheetsTemplate.svelte'

  let className = ''
  export { className as class }

  // TODO: add getItems props for each widget
</script>

<aside class={className}>
  <Widget title="Recent Chart Layouts" icon="chart">
    <svelte:fragment let:item slot="item">
      <LayoutItem small {item} />
    </svelte:fragment>
  </Widget>

  <Widget title="Insights" icon="insight" color="orange" iconWidth="14">
    <div slot="header">
      <ExternalLink href="https://insights.santiment.net/" />
    </div>
    <svelte:fragment let:item slot="item">
      <LayoutItem small {item} />
    </svelte:fragment>
  </Widget>

  <Widget title="Social trends" icon="social-trend" color="blue">
    <div slot="header">
      <ExternalLink href="https://app.santiment.net/labs/trends/" />
    </div>
    <svelte:fragment let:item slot="item">
      <SocialTrend {item} />
    </svelte:fragment>
  </Widget>

  <Widget title="Weekly Reports" icon="report" color="blue">
    <div slot="header" class="pro row hv-center c-white caption">PRO</div>
    <svelte:fragment let:item slot="item">
      <WeeklyReport {item} />
    </svelte:fragment>
  </Widget>

  <Widget title="Sheets Templates" icon="social-trend">
    <div slot="header" class="pro row hv-center c-white caption">PRO</div>
    <svelte:fragment let:item slot="item">
      <SheetsTemplate {item} />
    </svelte:fragment>
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
