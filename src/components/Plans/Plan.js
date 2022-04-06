import React from 'react'
import cx from 'classnames'
import RestrictBtn from './RestrictBtn'
import Features from './Features'
import PLANS, { TRIAL_LABEL } from './list'
import { formatPrice, getAlternativeBillingPlan } from '../../utils/plans'
import { useUser } from '../../stores/user'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import styles from './Plan.module.scss'

export const getAltPrice = (plans, billing, name) => {
  const { amount: altAmount, interval: altInterval } =
    getAlternativeBillingPlan(plans, { name, interval: billing }) || {}
  const [altPrice] = formatPrice(altAmount, null, altInterval)

  return { altPrice, altInterval }
}

export const isSameAsUserPlan = (subscription, id, userPlan) =>
  subscription && !subscription.trialEnd && id === userPlan

export const PlanDiscontBlock = ({ card, altPrice, altInterval }) => {
  return card.discount || `${altPrice} if billed ${altInterval}ly`
}

const Plan = ({
  plan,
  billing,
  plans,
  className,
  onDialogClose,
  subscription,
  classes = {},
  btnProps,
}) => {
  const { id, name, amount } = plan
  const card = PLANS[name]
  const userPlan = subscription && subscription.plan.id
  const { isTrial } = useUserSubscriptionStatus()

  const [price, priceType] = formatPrice(amount, name, billing)
  const sameAsUserPlan = isSameAsUserPlan(subscription, id, userPlan)
  const { altPrice, altInterval } = getAltPrice(plans, billing, name)

  if (!card) {
    return null
  }

  const isCustom = price === 'Custom'
  const isFree = name === 'FREE'

  return (
    <div
      className={cx(
        styles.card,
        className,
        classes.wrapper,
        card.isPopular && styles.card_popular,
        sameAsUserPlan && styles.card_active,
        sameAsUserPlan && classes.wrapper_active,
      )}
    >
      <div className={cx(styles.card__top, classes.top)}>
        <h3 className={cx(styles.card__title, isFree && styles.card__title__free)}>
          {card.title} {sameAsUserPlan && isTrial ? 'Trial' : ''}
        </h3>
      </div>
      <div className={styles.desc}>{card.desc}</div>
      <div className={cx(styles.details, isCustom && styles.details_custom)}>
        {!isCustom && (
          <div className={cx(styles.price, classes.price)}>
            {price}
            <span className={styles.price__type}>{priceType}</span>
          </div>
        )}

        <div className={styles.discount}>
          <PlanDiscontBlock card={card} altPrice={altPrice} altInterval={altInterval} />
        </div>

        <PlanBtn
          onDialogClose={onDialogClose}
          subscription={subscription}
          btnProps={btnProps}
          sameAsUserPlan={sameAsUserPlan}
          card={card}
          altPrice={altPrice}
          amount={amount}
          billing={billing}
          id={id}
          showCreditMsg={!isFree}
        />

        <Features isGreen={isFree} data={card.features} classes={{ ...styles, ...classes }} />
      </div>
    </div>
  )
}

export const PlanBtn = ({
  onDialogClose,
  subscription,
  btnProps,
  sameAsUserPlan,
  card,
  altPrice,
  amount,
  billing,
  id,
  className,
  showCreditMsg,
  onOpen,
}) => {
  const { isLoggedIn } = useUser()
  const { isEligibleForSanbaseTrial } = useUserSubscriptionStatus()
  const isSubscriptionCanceled = subscription && subscription.cancelAtPeriodEnd

  const label =
    isLoggedIn && card.link === TRIAL_LABEL
      ? isEligibleForSanbaseTrial
        ? card.link
        : 'Pay'
      : card.link
  return (
    <div className={className}>
      {!isLoggedIn || sameAsUserPlan || isSubscriptionCanceled ? (
        <>
          <RestrictBtn
            showCreditMsg={showCreditMsg}
            sameAsUserPlan={sameAsUserPlan}
            isSubscriptionCanceled={isSubscriptionCanceled}
            label={label}
          />
        </>
      ) : (
        <card.Component
          title={card.title}
          label={label}
          price={amount}
          billing={billing}
          planId={+id}
          subscription={subscription}
          onDialogClose={onDialogClose}
          btnProps={btnProps}
          altPrice={altPrice}
          onOpen={onOpen}
        />
      )}
    </div>
  )
}

export default Plan
