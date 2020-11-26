import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { getAlternativeBillingPlan } from '../../utils/plans'
import PlanPaymentDialog from '../../components/Plans/PlanPaymentDialog'
import { usePlans } from '../../ducks/Plans/hooks'
import { useUserSubscription } from '../../stores/user/subscriptions'
import styles from './UpgradeBtn.module.scss'

const Trigger = ({
  variant,
  className,
  iconClassName,
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
    {showCrownIcon && (
      <Icon type='crown' className={cx(styles.icon, iconClassName)} />
    )}
    {children}
  </Button>
)

const UpgradeBtn = ({
  loginRequired = true,
  className,
  iconClassName,
  variant = 'fill',
  showCrown = true,
  accent,
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
            {showCrown && (
              <Icon type='crown' className={cx(styles.icon, iconClassName)} />
            )}
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
          accent: accent || 'orange',
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
      iconClassName={iconClassName}
      variant={variant}
      accent={accent}
      {...props}
    />
  )
}

export default UpgradeBtn
