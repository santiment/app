import React, { useEffect, useRef } from 'react'
import CancelSubscriptionDialog from '../../components/SubscriptionCancelDialog/SubscriptionCancelDialog'
import { useUserSubscription } from '../../stores/user/subscriptions'
import SubscriptionSettings from 'webkit/ui/Pricing/SubscriptionSettings/index.svelte'

const SettingsSubscription = () => {
  const ref = useRef()
  const dialogRef = useRef()
  const { subscription } = useUserSubscription()

  useEffect(() => {
    const svelte = new SubscriptionSettings({ target: ref.current })

    window.showCancelSubscriptionDialog = () => {
      if (dialogRef.current) dialogRef.current.openDialog()
    }

    return () => {
      svelte.$destroy()
      delete window.showCancelSubscriptionDialog
    }
  }, [])

  return (
    <div id={ref.current ? '' : 'subscription'} ref={ref} className='mrg-xl mrg--b'>
      {subscription && (
        <CancelSubscriptionDialog noTrigger ref={dialogRef} subscription={subscription} />
      )}
    </div>
  )
}

export default SettingsSubscription
