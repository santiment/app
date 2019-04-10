import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Panel, Label, Icon } from '@santiment-network/ui'
import GetHypedTrends from './../../components/Trends/GetHypedTrends'
import InsightsFeatured from '../../components/Insight/InsightsFeatured'
import TrendsTable from '../../components/Trends/TrendsTable/TrendsTable'
import DashboardPageSubscription from './DashboardPageSubscription'
import DashboardPageOnboard from './DashboardPageOnboard'
import styles from './DashboardPage.module.scss'

const More = ({ link }) => (
  <Link to={link} className={styles.more}>
    <Label accent='jungle-green'>
      More <Icon className={styles.pointer} type='pointer-right' />
    </Label>
  </Link>
)

const DashboardPage = ({ isLoggedIn }) => (
  <div className={styles.wrapper + ' page'}>
    {isLoggedIn ? (
      <DashboardPageOnboard />
    ) : (
      <div className={styles.banner}>
        <div className={styles.banner__top}>
          <div className={styles.banner__title}>
            Noise control for the crypto market
          </div>
          <div className={styles.banner__description}>
            Santiment provides advanced 360° overview of the crypto market and
            its biggest driving forces
          </div>
          <Button variant='fill' accent='positive' as={Link} to='/login'>
            Get started
          </Button>
        </div>
        <div className={styles.banner__info}>
          <div className={styles.advantages}>
            <div className={styles.advantage}>
              <div className={styles.advantage__img} />
              <div className={styles.advantage__text}>
                On-chain, social and development data for 1000+ crypto projects
              </div>
            </div>
            <div className={styles.advantage}>
              <div className={styles.advantage__img} />

              <div className={styles.advantage__text}>
                Exclusive crypto metrics and curated, data-driven daily insights
              </div>
            </div>
            <div className={styles.advantage}>
              <div className={styles.advantage__img} />

              <div className={styles.advantage__text}>
                Growing community of crypto traders and market analysts
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    <div className={styles.column}>
      <div className={styles.column__left}>
        <h2 className={styles.subtitle}>
          Emerging trends <More link='/labs/trends/' />
        </h2>
        <GetHypedTrends
          render={({ isLoading, items }) => (
            <TrendsTable
              header='Last trends'
              trend={items.length > 0 ? items[items.length - 1] : {}}
              isLoading={isLoading}
            />
          )}
        />
      </div>
      <div className={styles.column__right}>
        <h2 className={styles.subtitle}>
          Featured insights <More link='/insights/' />
        </h2>
        <div className={styles.insights}>
          <Panel className={styles.insights__panel}>
            <div className={styles.insights__list}>
              <InsightsFeatured className={styles.insights__card} />
            </div>
          </Panel>
        </div>
      </div>
    </div>
    {!isLoggedIn && <DashboardPageSubscription />}
  </div>
)

export default DashboardPage
