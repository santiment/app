import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import { useUser } from '../../stores/user'
import { PATHS } from '../../paths'
import sharedStyles from './Plans.module.scss'

const getProps = ({ label, sameAsUserPlan, isSubscriptionCanceled }) => {
  const { isLoggedIn } = useUser()

  if (!isLoggedIn) {
    return {
      children: label || 'Start free trial',
      as: Link,
      to: PATHS.CREATE_ACCOUNT,
      variant: 'fill'
    }
  }

  return sameAsUserPlan
    ? { children: 'Your current plan', disabled: true }
    : isSubscriptionCanceled
      ? {
        children: 'Upgrade now',
        as: Link,
        to: '/account#subscription?renew'
      }
      : { children: 'Upgrade now', as: Link, to: '/account', variant: 'fill' }
}

const RestrictBtn = ({ label, sameAsUserPlan, isSubscriptionCanceled }) => {
  const props = getProps({ label, sameAsUserPlan, isSubscriptionCanceled })

  return (
    <Button
      fluid
      accent='orange'
      border
      className={sharedStyles.link}
      {...props}
    />
  )
}

export default RestrictBtn
