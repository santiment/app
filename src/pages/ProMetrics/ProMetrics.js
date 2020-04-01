import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import UpgradeBtn from '../../components/UpgradeBtn/UpgradeBtn'
import ProMetric from './ProMetric/ProMetric'
import {
  GreenSignBlockSvg,
  OrangeBlockSvg,
  SECOND_METRICS_GROUP,
  THIRD_METRICS_GROUP
} from './utils'
import { MobileOnly } from '../../components/Responsive'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import LoginEmailForm, { EmailForm } from '../Login/LoginEmailForm'
import { FIRST_METRICS_GROUP } from './utils.js'
import styles from './ProMetrics.module.scss'

const ProMetrics = ({ history, isLoggedIn }) => {
  return (
    <div className={cx('page', styles.container)}>
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
            As most of you know, Sanbase is a free to use platform to do
            research and study on-chain and behavioral analytics on the crypto
            markets.
          </div>

          <div className={styles.description}>
            However, there is a paid version, known as “Pro”, that unlocks many
            doors and models that our free users are unable to access. Take a
            look at the{' '}
            <span className={styles.highline}>
              list of perks we offer to our Pro subscribers
            </span>
            , and see all of the benefits that come with being an insider on our
            platform!
          </div>

          <UpgradeBtn loginRequired={false} className={styles.upgradeBtn}>
            Upgrade
          </UpgradeBtn>

          <div className={cx(styles.description, styles.oneOf)}>
            One of these perks is access to our Sansheets plugin and the various
            templates we have built with it. This article will give you an
            overview of these templates.
          </div>
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

        <div className={styles.ask}>
          {OrangeBlockSvg}

          <div className={styles.askBlock}>
            <div className={styles.askTitle}>Convinced to upgrade already?</div>

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

      {!isLoggedIn && (
        <div className={styles.ask}>
          <div className={styles.signSvg}>{GreenSignBlockSvg}</div>

          <div className={styles.askBlock}>
            <LoginEmailForm
              prepareState={PrepareState}
              history={history}
              classes={styles}
              showBack={false}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const PrepareState = props => {
  const { loading, loginEmail, setEmail } = props

  return (
    <>
      <div className={cx(styles.askTitle, styles.sign)}>
        Don’t have an account? Sign up now!
      </div>
      <EmailForm
        loading={loading}
        loginEmail={loginEmail}
        setEmail={setEmail}
        classes={styles}
        placeholder='Enter your email'
        label={
          <>
            Get started{' '}
            <Icon type='pointer-right' className={styles.arrowRight} />
          </>
        }
      />
    </>
  )
}

export default ProMetrics
