import React from 'react'
import Settings from '../Settings'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import styles from './AffilateSettings.module.scss'
import { PUBLIC_USER_DATA_QUERY } from '../../../queries/ProfileGQL'
import PageLoader from '../../../components/Loader/PageLoader'
import { Query } from 'react-apollo'
import { SHOW_PROMOTER_QUERY } from './promotersGql'
import Input from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
import SocialMediaLinks from '../../../components/SocialMediaLinks/SocialMediaLinks'
import { connect } from 'react-redux'
import CreatePromoter from '../../../components/CreatePromoter/CreatePromoter'
import AffilateStatistics from './AffilateStatistics/AffilateStatistics'

const AffilateSettings = ({ isPromoter }) => {
  if (!isPromoter && false) {
    return (
      <Settings id='affilate' header='Referral link'>
        <CreatePromoter />
      </Settings>
    )
  }

  const copy = () => {}

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Settings id='affilate' header='Referral link'>
          <Settings.Row>
            <Query query={SHOW_PROMOTER_QUERY}>
              {({ data: { getUser = {}, loading } = {} }) => {
                if (loading) {
                  return <PageLoader className={styles.loader} />
                }

                return (
                  <div className={styles.wrapper}>
                    <div className={styles.block}>
                      <div className={styles.title}>
                        Your Sanbase referral link
                      </div>
                      <div className={styles.copyBlock}>
                        <div>
                          <Input
                            className={styles.linkInput}
                            placeholder='2H8vZG5P'
                          />
                          <Button onClick={copy} />
                        </div>
                      </div>
                    </div>

                    <div className={styles.block}>
                      <div className={styles.title}>Share on social media</div>
                      <SocialMediaLinks classes={styles} />
                    </div>
                  </div>
                )
              }}
            </Query>
          </Settings.Row>
        </Settings>
      </div>
      <div className={styles.right}>
        <Settings id='affilate-statistics' header='Statistics'>
          <Settings.Row>
            <AffilateStatistics />
          </Settings.Row>
        </Settings>
      </div>
    </div>
  )
}

const mapStateToProps = ({
  user: { data: { settings: { isPromoter } = {} } = {} }
}) => {
  return {
    isPromoter
  }
}

export default connect(mapStateToProps)(AffilateSettings)
