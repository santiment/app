import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { getAlternativeBillingPlan } from '../../utils/plans'
import PlanPaymentDialog from '../../components/Plans/PlanPaymentDialog'
import { usePlans } from '../../ducks/Plans/hooks'
import { useUserSubscription } from '../../contexts/user/subscriptions'
import styles from './UpgradeBtn.module.scss'

const Trigger = ({
  variant,
  className,
  children = 'Upgrade',
  showCrownIcon = true,
  ...props
}) => (
  <Button
    className={cx(styles.btn, styles[variant], className)}
    variant={variant}
    accent='orange'
    {...props}
  >
    {showCrownIcon && <Icon type='crown' className={styles.icon} />}
    {children}
  </Button>
)

const UpgradeBtn = ({
  loginRequired = true,
  className,
  variant = 'fill',
  ...props
}) => {
  const { loading, subscription } = useUserSubscription()
  const [plans] = usePlans()

  if (loading) {
    return null
  }

  if (subscription && subscription.trialEnd) {
    const upgradePlan = getAlternativeBillingPlan(plans, subscription.plan)
    const { id, name, amount, interval } = upgradePlan || {}

    return (
      <PlanPaymentDialog
        label={
          <>
            <Icon type='crown' className={styles.icon} />
            Upgrade
          </>
        }
        title={name}
        price={amount}
        planId={+id}
        billing={interval}
        btnProps={{
          fluid: false,
          border: false,
          variant: variant,
          accent: 'orange',
          className: cx(styles.btn, styles.fill, className)
        }}
      />
    )
  }

  return (
    <Trigger
      as={Link}
      to='/pricing'
      className={className}
      variant={variant}
      {...props}
    />
  )
}

export default UpgradeBtn
