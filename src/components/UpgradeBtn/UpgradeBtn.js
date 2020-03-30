import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import {
  getCurrentSanbaseSubscription,
  getAlternativeBillingPlan
} from '../../utils/plans'
import { checkIsLoggedIn } from '../../pages/UserSelectors'
import PlanPaymentDialog from '../../components/Plans/PlanPaymentDialog'
import { usePlans } from '../../ducks/Plans/hooks'
import styles from './UpgradeBtn.module.scss'

const Trigger = ({ variant, className, children = 'Upgrade', ...props }) => (
  <Button
    className={cx(styles.btn, styles[variant], className)}
    variant={variant}
    accent='orange'
    {...props}
  >
    <Icon type='crown' className={styles.icon} />
    {children}
  </Button>
)

// NOTE(vanguard): redux passes "dispatch" prop to the component.
// We should capture it in order to not assign it as a invalid dom attribute
const UpgradeBtn = ({
  isLoggedIn,
  isUserLoading,
  loginRequired = true,
  subscription,
  dispatch,
  className,
  variant = 'fill',
  trigger = (
    <>
      <Icon type='crown' className={styles.icon} />
      Upgrade
    </>
  ),
  ...props
}) => {
  const [plans] = usePlans()

  if (isUserLoading) {
    return null
  }

  if (subscription.trialEnd) {
    const upgradePlan = getAlternativeBillingPlan(plans, subscription.plan)
    const { id, name, amount, interval } = upgradePlan || {}

    return (
      <PlanPaymentDialog
        label={trigger}
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

  return <Trigger as={Link} to='/pricing' className={className} {...props} />
}

const mapStateToProps = state => {
  return {
    isUserLoading: state.user.isLoading,
    isLoggedIn: checkIsLoggedIn(state),
    subscription: getCurrentSanbaseSubscription(state.user.data) || {}
  }
}

export default connect(mapStateToProps)(UpgradeBtn)
