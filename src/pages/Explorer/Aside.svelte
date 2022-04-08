<script>
  import Widget from './Category/Widget.svelte'
  import ExternalLink from './Components/ExternalLink.svelte'
</script>

<aside>
    <Widget title="Recent Chart Layouts" icon="chart" />
    <Widget title="Insights" icon="insight" color="orange" iconWidth=14>
        <div slot="header">
            <ExternalLink href="/" />
        </div>
    </Widget>
    <Widget title="Social trends" icon="social-trend" color="blue" type="social" items={[
        {
          id: 0,
          type: 'social',
          name: 'firo',
          volume: '>12k',
          tags: ['firo', 'users', 'project', 'price', 'mining', '1', '2', '3'],
          user: { username: 'test' },
        },
      ]}>
        <div slot="header">
            <ExternalLink href="/" />
        </div>
    </Widget> 
    <Widget title="Weekly Reports" icon="report" color="blue" type="weekly_report" items={[
        {
            id: 0,
            type: 'weekly_report',
            title: 'BTC pumps, but on-chain woes remain',
            date: 'December 22, 2021',
            url: '/'
        }
    ]}>
        <div slot="header" class="pro row hv-center c-white caption">
            PRO
        </div>
    </Widget> 
    <Widget title="Sheets Templates" icon="social-trend" type="sheets_templates" items={[
        {
            id: 0,
            type: 'sheets_templates',
            title: 'Funding Rate',
            desc: 'What the new Funding Rates Sansheets model does is automatically calculate the funding rates on Binance (in USD), as well as the funding rates on FTX. Santiment has extensive Funding Rate metrics for hundreds of assets on these two exchanges. Both Binance and FTX have shown major alpha by going against the common trend of traders, so averaging these two funding rates together for assets is an easy way to see tops and bottoms that are forming.',
            url: '/'
        }
    ]}>
        <div slot="header" class="pro row hv-center c-white caption">
            PRO
        </div>
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
