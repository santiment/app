import React from 'react'
import cx from 'classnames'
import SocialGrid from '../../../../components/SocialGrid'
import Suggestions from '../../../../components/Trends/Search/Suggestions'
import Info from '../shared/Info/Info'
import Section from '../shared/Section/Section'
import TrendsExploreInput from './TrendsExploreInput/TrendsExploreInput'
import TopTrends from './TopTrends/TopTrends'
import dashboardsStyles from '../dashboards.module.scss'

const SocialTool = ({ isDesktop }) => (
  <section className={cx(dashboardsStyles.wrapper, 'column')}>
    <Info
      title='Social tool'
      description='Explore the social volume of any word on crypto social media. You can also look at individual platform data, including Telegram, Twitter, and Reddit. Compare words and assets, and check any common words that have been frequently used alongside the coin’s or trending word’s name.'
    />
    <main className={cx(dashboardsStyles.content, 'column')}>
      <div>
        <TrendsExploreInput showButton />
        {isDesktop && <Suggestions />}
      </div>
      <Section
        id='soc_tool_top_10'
        title='Top 10 Hourly Trends'
        description='The top words with the highest percentage increase in mentions on crypto social media in
          the previous 24 hours'
      >
        <TopTrends />
      </Section>
      <Section
        id='soc_tool_mid_trends'
        title='Popular Mid-Term Trends'
        description='The most popular topics in crypto social media. This ranges from worldwide economic and
          health topics, to discussions directly related to airdrops, new listings, price movement,
          and more'
      >
        <SocialGrid />
      </Section>
    </main>
  </section>
)

export default SocialTool
