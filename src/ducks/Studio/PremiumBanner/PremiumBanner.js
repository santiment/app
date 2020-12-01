import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import { useUser } from '../../../stores/user'
import { PATHS } from '../../../paths'
import UpgradeBtn from '../../../components/UpgradeBtn/UpgradeBtn'
import styles from './PremiumBanner.module.scss'

const WIDGET_KEY = 'PRO_STUDIO_WIDGET_KEY'

const PremiumBanner = () => {
  const { isPro, loading, isTrial } = useUserSubscriptionStatus()
  const { isLoggedIn } = useUser()
  const [show, setShow] = useState(false)

  const availableForUser = (isPro && isTrial) || (!isPro && isLoggedIn)

  useEffect(
    () => {
      if (availableForUser && !loading) {
        setShow(!localStorage.getItem(WIDGET_KEY))
      }
    },
    [availableForUser, loading]
  )

  if (!show) {
    return null
  }

  function hide () {
    setShow(false)
    localStorage.setItem(WIDGET_KEY, true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Icon type='crown' className={styles.crown} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          Get premium data and market insights with Sanbase PRO
        </div>

        <div className={styles.description}>
          Access all Santiment metrics, unlimited watchlists and alerts, Sanbase
          Screener, daily market analysis and much more!
        </div>

        <div className={styles.actions}>
          {!isTrial && (
            <Button
              fluid
              accent='orange'
              variant='fill'
              className={styles.btn}
              as={Link}
              to={PATHS.CREATE_ACCOUNT}
            >
              Start free trial for 14 days
            </Button>
          )}

          {isTrial && <UpgradeBtn variant={'fill'} showCrown={false} />}
        </div>

        <div onClick={hide}>
          <Icon type={'close-medium'} className={styles.close} />
        </div>
      </div>
    </div>
  )
}

export default PremiumBanner
