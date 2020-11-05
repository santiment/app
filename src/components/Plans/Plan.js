import React from 'react'
import cx from 'classnames'
import RestrictBtn from './RestrictBtn'
import Features from './Features'
import PLANS from './list'
import { formatPrice, getAlternativeBillingPlan } from '../../utils/plans'
import styles from './Plan.module.scss'

const Plan = ({
  id,
  name,
  amount,
  userPlan,
  billing,
  plans,
  isSubscriptionCanceled,
  isLoggedIn,
  className,
  onDialogClose,
  subscription,
  classes = {},
  btnProps
}) => {
  const card = PLANS[name]
  const sameAsUserPlan =
    subscription && !subscription.trialEnd && id === userPlan
  const [price, priceType] = formatPrice(amount, name, billing)

  const { amount: altAmount, interval: altInterval } =
    getAlternativeBillingPlan(plans, { name, interval: billing }) || {}

  const [altPrice] = formatPrice(altAmount, null, altInterval)
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
        sameAsUserPlan && classes.wrapper_active
      )}
    >
      <div className={cx(styles.card__top, classes.top)}>
        <h3
          className={cx(styles.card__title, isFree && styles.card__title__free)}
        >
          {card.title}
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
          {card.discount || `${altPrice} if billed ${altInterval}ly`}
        </div>
        {!isLoggedIn || sameAsUserPlan || isSubscriptionCanceled ? (
          <RestrictBtn
            sameAsUserPlan={sameAsUserPlan}
            isSubscriptionCanceled={isSubscriptionCanceled}
          />
        ) : (
          <card.Component
            title={card.title}
            label={card.link}
            price={amount}
            billing={billing}
            planId={+id}
            subscription={subscription}
            onDialogClose={onDialogClose}
            btnProps={btnProps}
            altPrice={altPrice}
          />
        )}
        <Features
          isGreen={isFree}
          data={card.features}
          classes={{ ...styles, ...classes }}
        />
      </div>
    </div>
  )
}

export default Plan
