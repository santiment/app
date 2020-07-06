import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Label from '@santiment-network/ui/Label'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import PublicTemplates from './PublicTemplates/PublicTemplates'
import SocialTrends from './SocialTrends/SocialTrends'
import Trends from '../../components/Trends/Trends'
import EventBanner from '../../components/EventBanner'
import ResearchesBlock from '../../components/ResearchesBlock'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { MobileOnly } from '../../components/Responsive'
import IndexTab from './IndexTabs/IndexTab'
import WatchlistCards from '../../components/Watchlists/WatchlistCards'
import { BASIC_CATEGORIES } from '../assets/assets-overview-constants'
import MyWatchlist from '../../components/Watchlists/MyWatchlist'
import { PATHS } from '../../App'
import AlphaBlock from './AlphaBlock/AlphaBlock'
import styles from './MarketingPage.module.scss'

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

      <EventBanner className={styles.banner} />
      <div className={styles.inner}>
        <div className={cx(styles.block, styles.firstBlock)}>
          <IndexTab
            tabs={[
              {
                title: 'Explore Watchlists',
                content: (
                  <WatchlistCards
                    watchlists={BASIC_CATEGORIES.slice().reverse()}
                    classes={styles}
                    showNew={true}
                    showFeatured={true}
                  />
                )
              },
              {
                title: 'My Watchlists',
                content: <MyWatchlist showHeader={false} classes={styles} />
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
                title: 'Explore Chart Layouts',
                content: <PublicTemplates isFeatured />
              },
              {
                title: 'My Chart Layouts',
                content: <PublicTemplates userId={userId} />
              }
            ]}
          />
        </div>
      </div>

      <div className={styles.inner}>
        <IndexTab
          tabs={[
            {
              title: (
                <div className={cx(styles.alphaTitle)}>
                  Alpha
                  <Label
                    className={styles.proLabel}
                    variant='fill'
                    accent='texas-rose'
                  >
                    Pro
                  </Label>
                </div>
              ),
              content: (
                <div className={styles.block}>
                  <AlphaBlock classes={styles} />
                </div>
              )
            },
            {
              title: 'Top Market Calls',
              content: (
                <div className={styles.block}>
                  <div className={styles.description}>
                    This leaderboard allows you to track our leading analysts
                    and authors as they make{' '}
                    <span className={styles.bold}>bold market calls.</span> They
                    use the same Santiment on-chain and social metrics that are
                    available to you.
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
              )
            }
          ]}
        />

        <div className={styles.block}>
          <IndexTab
            tabs={[
              {
                title: 'Search Trends',
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
                title: 'Santrends',
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
