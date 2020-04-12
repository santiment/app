import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import Settings from '../Settings'
import PageLoader from '../../../components/Loader/PageLoader'
import CreatePromoter from '../../../components/CreatePromoter/CreatePromoter'
import AffilateStatistics from './AffilateStatistics/AffilateStatistics'
import PromotionLink from './PromotionLink/PromotionLink'
import { SHOW_PROMOTER_QUERY } from './promotersGql'
import styles from './SettingsAffilate.module.scss'

const SettingsAffilate = ({ isPromoter }) => {
  const [settings, setSettings] = useState(null)

  if (!isPromoter && !settings) {
    return (
      <Settings id='affilate' header='Referral link'>
        <CreatePromoter setData={setSettings} />
      </Settings>
    )
  }

  return (
    <Query query={SHOW_PROMOTER_QUERY} skip={!!settings}>
      {({ data = {} }) => {
        const { loading, showPromoter } = data

        if (showPromoter) {
          setSettings(showPromoter)
        }

        if (!settings || loading) {
          return <PageLoader className={styles.loader} />
        }

        const { promotions } = settings

        return (
          <div className={styles.container}>
            <div className={styles.left}>
              <Settings id='affilate' header='Referral link'>
                <Settings.Row>
                  <div className={styles.block}>
                    <div className={styles.title}>
                      Your Sanbase referral link
                    </div>
                    {promotions.map(item => (
                      <PromotionLink
                        data={item}
                        classes={styles}
                        key={item.referralLink}
                      />
                    ))}
                  </div>
                </Settings.Row>
              </Settings>
            </div>
            <div className={styles.right}>
              <Settings
                id='affilate-statistics'
                header='Statistics'
                contentClassName={styles.statistics}
              >
                <Settings.Row className={styles.statisticsSetting}>
                  <AffilateStatistics promotions={promotions} />
                </Settings.Row>
              </Settings>
            </div>
          </div>
        )
      }}
    </Query>
  )
}

const mapStateToProps = ({
  user: { data: { settings: { isPromoter } = {} } = {} }
}) => {
  return {
    isPromoter
  }
}

export default connect(mapStateToProps)(SettingsAffilate)
