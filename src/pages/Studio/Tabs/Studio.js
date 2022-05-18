import React, { useRef, useEffect, useCallback } from 'react'
import { newGlobalShortcut } from 'webkit/utils/events'
import { useHistory } from '../stores'
import Header from '../Header'
import Widget from '../Widget'
import Subwidgets from '../Subwidgets'
import Sidewidget from '../Sidewidget'
import { useUserSubscription } from '../../../stores/user/subscriptions'
import PlanPaymentDialog from '../../../components/Plans/PlanPaymentDialog'
import { usePlans } from '../../../ducks/Plans/hooks'
import { getAlternativeBillingPlan } from '../../../utils/plans'

const PaymentDialog = ({ subscription }) => {
  const [plans] = usePlans()
  const showPaymentRef = useRef()
  const planRef = useRef({})
  const { id, name, amount, interval } = planRef.current

  const Trigger = useCallback(({ onClick }) => {
    showPaymentRef.current = onClick
    return null
  }, [])

  useEffect(() => {
    window.showPaymentDialog = () => {
      if (!planRef.current) {
        planRef.current = getAlternativeBillingPlan(plans, subscription.plan)
      }

      if (showPaymentRef.current) showPaymentRef.current()
    }

    return () => {
      delete window.showPaymentDialog
    }
  }, [])

  return (
    <PlanPaymentDialog
      subscription={subscription}
      title={name}
      price={amount}
      planId={+id}
      billing={interval}
      Trigger={Trigger}
    />
  )
}

const StudioTab = ({
  studio,
  settings,
  widgets,
  metrics,
  sidewidget,
  modDate,
  modRange,
  InsightsStore,
  prevFullUrlRef,
  subwidgetsController,
}) => {
  const History = useHistory(studio)
  const { subscription } = useUserSubscription()

  useEffect(() => {
    if (!History) return

    const unsubCmdZ = newGlobalShortcut('CMD+Z', History.undo)
    const unsubCmdShiftZ = newGlobalShortcut('CMD+SHIFT+Z', History.redo)

    return () => {
      unsubCmdZ()
      unsubCmdShiftZ()
    }
  }, [History])

  return (
    <>
      <Header
        studio={studio}
        settings={settings}
        widgets={widgets}
        metrics={metrics}
        prevFullUrlRef={prevFullUrlRef}
      />

      {widgets.map(
        (widget) =>
          widget.container && (
            <Widget
              key={widget.id}
              widget={widget}
              target={widget.container}
              settings={settings}
              InsightsStore={InsightsStore}
            />
          ),
      )}

      {sidewidget && (
        <Sidewidget
          studio={studio}
          project={settings}
          metrics={metrics}
          sidewidget={sidewidget}
          modDate={modDate}
          modRange={modRange}
        />
      )}

      <Subwidgets
        subwidgets={subwidgetsController.subwidgets}
        settings={settings}
        modRange={modRange}
      />

      {subscription && <PaymentDialog subscription={subscription} />}
    </>
  )
}

export default StudioTab
