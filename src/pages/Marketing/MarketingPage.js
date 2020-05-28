import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import PublicTemplates from './PublicTemplates/PublicTemplates'
import SocialTrends from './SocialTrends/SocialTrends'
import Trends from '../../components/Trends/Trends'
import BannerYoutube from '../../components/BannerYoutube'
import ResearchesBlock from '../../components/ResearchesBlock'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { MobileOnly } from '../../components/Responsive'
import IndexTab from './IndexTabs/IndexTab'
import WatchlistCards from '../../components/Watchlists/WatchlistCards'
import { CATEGORIES } from '../assets/assets-overview-constants'
import MyWatchlist from '../../components/Watchlists/MyWatchlist'
import styles from './MarketingPage.module.scss'
import { PATHS } from '../../App'

const isCharts = ({ search }) =>
  search.indexOf('from') !== -1 && search.indexOf('to') !== -1

const MarketingPage = props => {
  const { history, userId, location } = props

  if (isCharts(location)) {
    return <Redirect to={PATHS.STUDIO} />
  }

  return (
    <div className={cx('page', styles.container)}>
      <MobileOnly>
        <MobileHeader
          showBack={true}
          goBack={history.goBack}
          classes={styles}
        />
      </MobileOnly>
      <BannerYoutube className={styles.banner} />
      <div className={styles.inner}>
        <div className={cx(styles.block, styles.firstBlock)}>
          <IndexTab
            tabs={[
              {
                type: 'Explore Watchlists',
                content: (
                  <WatchlistCards
                    watchlists={CATEGORIES}
                    classes={styles}
                    showNew={true}
                  />
                )
              },
              {
                type: 'My Watchlists',
                content: (
                  <MyWatchlist
                    showHeader={false}
                    showNew={true}
                    classes={styles}
                  />
                )
              }
            ]}
          />
        </div>
      </div>

      <div className={cx(styles.block, styles.chartLayoutsWrapper)}>
        <div className={styles.chartLayouts}>
          <IndexTab
            tabs={[
              {
                type: 'Explore Chart Layouts',
                content: <PublicTemplates isFeatured />
              },
              {
                type: 'My Chart Layouts',
                content: <PublicTemplates userId={userId} />
              }
            ]}
          />
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.block}>
          <IndexTab
            tabs={[
              {
                type: 'Search Trends',
                content: (
                  <>
                    <div className={styles.description}>
                      Navigate visually through the noise. Similar to Google
                      Trends, Santiment developed this search platform to
                      explore how keywords and topics fluctuate over time. See
                      the total social volume and social dominance among various
                      crypto-related discussion forums, and compare directly to
                      others. See what Google Trends is unable to see.
                    </div>
                    <Link to={'/labs/trends/explore/'} className={styles.link}>
                      Start researching Search Trends
                    </Link>
                    <SocialTrends />
                  </>
                )
              },
              {
                type: 'Santrends',
                content: (
                  <>
                    <div className={styles.description}>
                      We removed the noise even more. Get top 10 emerging trends
                      for recent time intervals. Use this “hot list” to see what
                      the “hottest” topics are in a ranked format.{' '}
                      <span className={styles.italics}>
                        Hint: if any of the coins (except BTC and ETH) make to
                        the top 3 - the top might be near. Crowd is{' '}
                        <span className={styles.bold}>“all in”</span>
                      </span>
                    </div>
                    <Link to={'/labs/trends/'} className={styles.link}>
                      Start researching Santrends
                    </Link>
                    <Trends />
                  </>
                )
              }
            ]}
          />
        </div>

        <div className={styles.block}>
          <div className={styles.subTitle}>Market Call Leaderboard</div>
          <div className={styles.description}>
            This leaderboard allows you to track our leading analysts and
            authors as they make{' '}
            <span className={styles.bold}>bold market calls.</span> They use the
            same Santiment on-chain and social metrics that are available to
            you.
          </div>
          <iframe
            title='Insights table'
            className='airtable-embed'
            src='https://airtable.com/embed/shrCwTMKbFLiRn3Eq?backgroundColor=gray&viewControls=on'
            frameBorder='0'
            width='100%'
            height='533'
            style={{
              background: 'transparent',
              border: 'none'
            }}
          />
        </div>
      </div>
      <ResearchesBlock />
      <CommonFooter />
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  userId: user && user.data ? user.data.id : undefined
})

export default connect(mapStateToProps)(MarketingPage)
