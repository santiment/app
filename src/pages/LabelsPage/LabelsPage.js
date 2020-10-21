import React from 'react'
import cx from 'classnames'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { MobileOnly } from '../../components/Responsive'
import { Block } from '../StablecoinsPage/StablecoinsPageStructure'
import LabelBalances from '../../ducks/Labels/LabelBalances/LabelBalances'
import { useRestrictedInfo } from '../UniswapProtocolPage/hooks'
import styles from './LabelsPage.module.scss'
import gql from 'graphql-tag'

const METRIC_BOUNDARIES_QUERY = gql`
  query {
    getMetric(metric: "all_known_balance") {
      metadata {
        isRestricted
      }
    }
  }
`

const LabelsPage = ({ history }) => {
  const isProChecking = useRestrictedInfo(METRIC_BOUNDARIES_QUERY)

  return (
    <div className={cx('page', styles.container)}>
      <MobileOnly>
        <MobileHeader
          showBack={true}
          goBack={history.goBack}
          classes={styles}
        />
      </MobileOnly>

      <div className={styles.inner}>
        <Block title='Label Balances' isPaywalActive={isProChecking}>
          <LabelBalances />
        </Block>
      </div>

      <div className={styles.footer}>
        <CommonFooter />
      </div>
    </div>
  )
}

export default LabelsPage
