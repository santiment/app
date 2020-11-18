import React from 'react'
import cx from 'classnames'
import PLANS from '../../../components/Plans/list'
import {
  getAltPrice,
  isSameAsUserPlan,
  PlanBtn
} from '../../../components/Plans/Plan'
import { formatPrice } from '../../../utils/plans'
import styles from './PlanDetails.module.scss'

export const PlanCard = ({
  plan,
  plans,
  subscription,
  userPlan,
  billing,
  as: El = 'div',
  classes = {}
}) => {
  const { id, name, amount } = plan
  const card = PLANS[name]
  const isFree = name === 'FREE'

  const sameAsUserPlan = isSameAsUserPlan(subscription, id, userPlan)
  const { altPrice } = getAltPrice(plans, billing, name)
  const [price, priceType] = formatPrice(amount, name, billing)

  return (
    <El key={id} className={cx(styles.th, styles.cell, classes.cell)}>
      <div className={styles.title}>
        <div className={cx(styles.name, classes.name)}>{card.title}</div>

        <div className={cx(styles.description, classes.description)}>
          {card.discount || (
            <div>
              {price} {priceType}
            </div>
          )}
        </div>
      </div>

      <PlanBtn
        subscription={subscription}
        sameAsUserPlan={sameAsUserPlan}
        card={card}
        altPrice={altPrice}
        amount={amount}
        billing={billing}
        id={id}
        btnProps={{
          accent: 'orange'
        }}
        className={classes.planBtn}
        showCreditMsg={!isFree}
      />
    </El>
  )
}
