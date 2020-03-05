import React from 'react'
import cx from 'classnames'
import RestrictBtn from './RestrictBtn'
import Features from './Features'
import PLANS from './list'
import { formatPrice, getAlternativeBillingPlan } from '../../utils/plans'
import styles from './Plan.module.scss'

const toggleCardDetails = ({ currentTarget }) =>
  currentTarget.classList.toggle(styles.card_opened)

const Plan = ({
  id,
  name,
  amount,
  userPlan,
  billing,
  plans,
  isSubscriptionCanceled,
  isLoggedIn,
  subscription = {},
  className,
  onDialogClose,
  classes = {},
  btnProps
}) => {
  const card = PLANS[name]
  const sameAsUserPlan = !subscription.trialEnd && id === userPlan
  const [price, priceType] = formatPrice(amount, name, billing)

  const { amount: altAmount, interval: altInterval } =
    getAlternativeBillingPlan(plans, { name, interval: billing }) || {}

  const [altPrice] = formatPrice(altAmount, null, altInterval)
  const isCustom = price === 'Custom'

  return (
    <div
      onClick={toggleCardDetails}
      className={cx(
        styles.card,
        className,
        classes.wrapper,
        card.isPopular && styles.card_popular,
        sameAsUserPlan && styles.card_active,
        sameAsUserPlan && classes.wrapper_active
      )}
    >
      <div
        className={cx(
          styles.card__top,

          classes.top
        )}
      >
        <h3 className={styles.card__title}>
          {card.title}
          {card.isPopular && (
            <span className={cx(styles.popular, classes.popular)}>Popular</span>
          )}
        </h3>
        <svg
          width='15'
          height='8'
          viewBox='0 0 15 8'
          className={styles.card__arrow}
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M14.313 0.754539C14.5867 1.06549 14.5564 1.5394 14.2455 1.81304L7.99546 7.31304C7.71218 7.56233 7.2878 7.56233 7.00452 7.31304L0.754519 1.81304C0.443563 1.5394 0.413314 1.06549 0.686955 0.754538C0.960596 0.443582 1.43451 0.413333 1.74546 0.686974L7.49999 5.75096L13.2545 0.686974C13.5655 0.413333 14.0394 0.443583 14.313 0.754539Z'
          />
        </svg>
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
        <Features data={card.features} classes={{ ...styles, ...classes }} />
      </div>
    </div>
  )
}

export default Plan
