import React from 'react'
import cx from 'classnames'
import { InputWithIcon } from '@santiment-network/ui/Input'
import SubscriptionForm from '../../../components/SubscriptionForm/SubscriptionForm'
import styles from './UpgradeInfo.module.scss'

const UpgradeInfo = () => {
  return (
    <div className={cx(styles.ask, styles.bgSvg, styles.signSvg)}>
      <div className={styles.askBlock}>
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
