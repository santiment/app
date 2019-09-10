import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import sharedStyles from './Plans.module.scss'

const RestrictBtn = ({ sameAsUserPlan, isSubscriptionCanceled }) => {
  const props = sameAsUserPlan
    ? { children: 'Your current plan', disabled: true }
    : isSubscriptionCanceled
      ? {
        children: 'Upgrade now',
        as: Link,
        to: '/account#subscription?renew'
      }
      : { children: 'Upgrade now', as: Link, to: '/account', variant: 'fill' }
  return (
    <Button
      fluid
      accent='positive'
      border
      className={sharedStyles.link}
      {...props}
    />
  )
}

export default RestrictBtn
