import React from 'react'
import { Link } from 'react-router-dom'
import { track } from 'webkit/analytics'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import { useUserSubscription } from '../../stores/user/subscriptions'
import { PlanBtn } from '../Plans/Plan'
import PLANS from '../Plans/list'
import { usePlans } from '../../ducks/Plans/hooks'
import HeaderImage from './header'
import styles from './index.module.scss'

const INTERVAL = 'month'

const TabLimitModal = ({ maxTabsCount, isPro, onOpen }) => {
  const { subscription } = useUserSubscription()
  const [plans] = usePlans()
  const PLAN_KEY = isPro ? 'PRO_PLUS' : 'PRO'
  const PLAN = plans.find(({ interval, name }) => interval === INTERVAL && name === PLAN_KEY)

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <Dialog autoFocus open showCloseBtn={false} classes={styles}>
        <HeaderImage />
        <p className={styles.descTop}>Browser Tabs Restriction</p>
        <p className={styles.descBottom}>
          Dear user, your current plan allows you to use up to {maxTabsCount} Browser Tabs for
          Charts and Screeners. If you want to use more, please upgrade
        </p>
        <div className={styles.buttons} id='tabLimitModalButtons'>
          {PLAN && (
            <PlanBtn
              subscription={subscription}
              card={PLANS[PLAN_KEY]}
              billing={INTERVAL}
              btnProps={{
                variant: 'fill',
                accent: 'orange',
                border: undefined,
                fluid: undefined,
                className: undefined,
              }}
              amount={PLAN.amount}
              id={PLAN.id}
              onOpen={onOpen}
            />
          )}
          <Button
            variant='flat'
            border
            as={Link}
            to='/pricing'
            onClick={() => track.event('tab_limit_modal_review_plans_clicked')}
          >
            Review plans
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export default TabLimitModal
