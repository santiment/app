import React from 'react'
import { Query } from '@apollo/react-components'
import UpgradeBtn from '../../../../components/UpgradeBtn/UpgradeBtn'
import { USER_SUBSCRIPTIONS_QUERY } from '../../../../queries/plans'
import Panel from '@santiment-network/ui/Panel/Panel'
import { checkIsProUser } from '../../../../utils/account'
import proIcon from './../../../../assets/feed/pro-icon.svg'
import externalStyles from './../FeedItemRenderer/FeedItemRenderer.module.scss'
import styles from './MakeProSubscriptionCard.module.scss'

const MakeProSubscriptionCard = () => {
  return (
    <Query query={USER_SUBSCRIPTIONS_QUERY}>
      {({ loading, data: { currentUser = {} } = {} }) => {
        if (loading) {
          return 'Loading...'
        }

        const isProSanbase = checkIsProUser(currentUser)

        if (isProSanbase) {
          return null
        }

        return (
          <Panel padding className={externalStyles.card}>
            <div className={styles.center}>
              <img src={proIcon} alt='pro-icon' className={styles.icon} />

              <div className={styles.content}>
                <div className={styles.title}>Go PRO and get more data</div>
                <div className={styles.description}>
                  Unlimited metrics, all types of alerts, handcrafted report and
                  much more
                </div>
              </div>
            </div>

            <div className={styles.right}>
              <UpgradeBtn className={styles.upgrade} variant='fill' />
            </div>
          </Panel>
        )
      }}
    </Query>
  )
}

export default MakeProSubscriptionCard
