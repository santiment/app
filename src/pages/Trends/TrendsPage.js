import React from 'react'
import { Link } from 'react-router-dom'
import { Panel, Label, Icon } from '@santiment-network/ui'
import GetHypedTrends from './../../components/Trends/GetHypedTrends'
import InsightsFeatured from '../../components/Insight/InsightsFeatured'
import TrendsTable from '../../components/Trends/TrendsTable/TrendsTable'
import styles from './TrendsPage.module.scss'

const More = ({ link }) => (
  <Link to={link} className={styles.more}>
    <Label accent='jungle-green'>
      More <Icon className={styles.pointer} type='pointer-right' />
    </Label>
  </Link>
)

const TrendsPage = () => (
  <div className={styles.TrendsPage + ' page'}>
    <div className={styles.header}>
      <h1>Overview</h1>
    </div>
    <div className={styles.column}>
      <div className={styles.column__left}>
        <h2 className={styles.subtitle}>
          Trending words <More link='/labs/trends/' />
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

        <div className={styles.gradient}>
          <Panel className={styles.finsights}>
            <div className={styles.finsights__scroller}>
              <InsightsFeatured className={styles.card} />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  </div>
)

export default TrendsPage
