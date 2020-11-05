import React from 'react'
import Plan from '../../components/Plans/Plan'
import styles from './Plan.module.scss'

const PLAN_CLASSES = {
  wrapper: styles.card,
  wrapper_active: styles.card_active,
  top: styles.card__top,
  price: styles.card__price,
  feature: styles.feature,
  feature__icon: styles.feature__icon,
  popular: styles.card__popular
}

const PricingPlan = ({ ...props }) => {
  return (
    <Plan
      {...props}
      classes={PLAN_CLASSES}
      btnProps={{ border: undefined, variant: 'fill', accent: 'orange' }}
    />
  )
}

export default PricingPlan
