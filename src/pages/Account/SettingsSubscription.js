import React, { useEffect, useRef } from 'react'
import SubscriptionSettings from './SettingsSubscription.svelte'

const SettingsSubscription = () => {
  const ref = useRef()

  useEffect(() => {
    const svelte = new SubscriptionSettings({ target: ref.current })

    return () => svelte.$destroy()
  }, [ref])

  return <div ref={ref} className='mrg-xl mrg--b'></div>
}

export default SettingsSubscription
