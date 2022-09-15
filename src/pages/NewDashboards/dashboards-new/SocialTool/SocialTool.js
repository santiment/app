import React from 'react'
import cx from 'classnames'
import Info from '../shared/Info/Info'
import TrendsExploreInput from './TrendsExploreInput/TrendsExploreInput'
import TrendsExploreSuggestions from './TrendsExploreInput/TrendsExploreSuggestions'
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
        {isDesktop && <TrendsExploreSuggestions />}
      </div>
      <div>
        <h4 className='h4 txt-b mrg-s mrg--b'>Top 10 Hourly Trends</h4>
        <p className={cx(dashboardsStyles.description, 'body-2 mrg-xxl mrg--b')}>
          The top words with the highest percentage increase in mentions on crypto social media in
          the previous 24 hours
        </p>
        <TopTrends />
      </div>
    </main>
  </section>
)

export default SocialTool
