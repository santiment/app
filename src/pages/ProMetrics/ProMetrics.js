import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import UpgradeBtn from '../../components/UpgradeBtn/UpgradeBtn'
import ProMetric from './ProMetric/ProMetric'
import { SECOND_METRICS_GROUP, THIRD_METRICS_GROUP } from './utils'
import { MobileOnly } from '../../components/Responsive'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { FIRST_METRICS_GROUP } from './utils.js'
import upgradeSvg from './../../assets/pro-metrics/upgrade.svg'
import signSvg from './../../assets/pro-metrics/sign-bg.svg'
import styles from './ProMetrics.module.scss'
import ProMetricsFooter from './ProMetricsFooter/ProMetricsFooter'
import SubscriptionForm from '../../components/SubscriptionForm/SubscriptionForm'
import { InputWithIcon } from '@santiment-network/ui/Input'

const ProMetrics = ({ history, isLoggedIn }) => {
  return (
    <div className={cx('page', styles.container)}>
      <div className={styles.inner}>
        <MobileOnly>
          <MobileHeader
            showBack={true}
            goBack={history.goBack}
            classes={styles}
          />
        </MobileOnly>

        <div className={styles.firstStep}>
          <div className={styles.descriptions}>
            <div className={styles.crown}>
              <Icon type='crown' /> PRO Metrics
            </div>

            <div className={styles.perksTitle}>
              The Perks of Being a Pro Subscriber on Sanbase
            </div>

            <div className={styles.description}>
              Next to many other perks, Sanbase Pro subscribers get access to
              exclusive templates, dynamic reports and market-beating indices
              developed by the Santiment team.
            </div>

            <div className={styles.description}>
              New templates and indices are added monthly.
            </div>

            <UpgradeBtn loginRequired={false} className={styles.upgradeBtn}>
              Upgrade
            </UpgradeBtn>
          </div>

          {FIRST_METRICS_GROUP.map((metric, index) => {
            return (
              <ProMetric
                metric={metric}
                key={index}
                classes={{
                  container: styles.firstGroup
                }}
              />
            )
          })}

          <div
            className={cx(styles.ask, styles.bgSvg)}
            style={{
              background: 'url(' + upgradeSvg + ') repeat-x bottom'
            }}
          >
            <div className={styles.askBlock}>
              <div className={styles.askTitle}>
                Convinced to upgrade already?
              </div>

              <UpgradeBtn className={styles.askUpgradeBtn} />
            </div>
          </div>

          <div className={styles.row}>
            {SECOND_METRICS_GROUP.map((metric, index) => {
              return (
                <ProMetric
                  metric={metric}
                  key={index}
                  classes={{
                    container: styles.secondGroup,
                    svg: styles.secondGroupSvg
                  }}
                />
              )
            })}
          </div>
        </div>

        <div className={styles.secondStep}>
          <div className={styles.grid}>
            {THIRD_METRICS_GROUP.map((metric, index) => {
              return (
                <ProMetric
                  metric={metric}
                  key={index}
                  classes={{
                    container: styles.thirdGroup,
                    svg: styles.thirdGroupSvg
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>

      {!isLoggedIn && (
        <div
          className={cx(styles.ask, styles.bgSvg, styles.signSvg)}
          style={{
            background: 'url(' + signSvg + ') repeat-x bottom'
          }}
        >
          <div className={cx(styles.askBlock, styles.askAccount)}>
            <div className={cx(styles.askTitle, styles.sign)}>
              Don’t have an account? Sign up now!
            </div>

            <SubscriptionForm
              classes={styles}
              inputEl={InputWithIcon}
              icon='mail'
              iconPosition='left'
              subscriptionLabel='Send me weekly updates from crypto market'
            />
          </div>
        </div>
      )}

      <ProMetricsFooter />
    </div>
  )
}

export default ProMetrics
