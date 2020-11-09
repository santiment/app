import React from 'react'
import { getShowingPlans } from '../../../utils/plans'
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'
import PlanDetailsDesktop from './PlanDetailsDesktop'
import PlanDetailsMobile from './PlanDetailsMobile'

const PlanDetails = ({ billing, plans, subscription }) => {
  const showingPlans = getShowingPlans(plans, billing)
  const userPlan = subscription && subscription.plan.id

  return (
    <>
      <DesktopOnly>
        <PlanDetailsDesktop
          showingPlans={showingPlans}
          userPlan={userPlan}
          billing={billing}
          plans={plans}
          subscription={subscription}
        />
      </DesktopOnly>
      <MobileOnly>
        <PlanDetailsMobile
          showingPlans={showingPlans}
          userPlan={userPlan}
          billing={billing}
          plans={plans}
          subscription={subscription}
        />
      </MobileOnly>
    </>
  )
}

export default PlanDetails
