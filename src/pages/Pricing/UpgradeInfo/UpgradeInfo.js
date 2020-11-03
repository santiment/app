import React from 'react'
import cx from 'classnames'
import { InputWithIcon } from '@santiment-network/ui/Input'
import SubscriptionForm from '../../../components/SubscriptionForm/SubscriptionForm'
import signSvg from '../../../assets/pro-metrics/sign-bg.svg'
import styles from './UpgradeInfo.module.scss'

const UpgradeInfo = () => {
  return (
    <div
      className={cx(styles.ask, styles.bgSvg, styles.signSvg)}
      style={{
        background: 'url(' + signSvg + ') repeat-x bottom'
      }}
    >
      <div className={cx(styles.askBlock, styles.askAccount)}>
        <div className={cx(styles.askTitle, styles.sign)}>
          Ready to get started? Sign up now!
        </div>

        <SubscriptionForm
          classes={styles}
          inputEl={InputWithIcon}
          icon='mail'
          iconPosition='left'
          hasSubscribed={false}
          subscriptionLabel='Send me weekly updates from crypto market'
        />
      </div>
    </div>
  )
}

export default UpgradeInfo
