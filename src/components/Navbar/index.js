import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import useGoogleOptimize from '@react-hook/google-optimize'
import Navbar from './Navbar.svelte'
import Search from './Search'
import NotificationsFeed from '../../ducks/Notifications/NotificationsFeed/NotificationsFeed'
import { useUser } from '../../stores/user'
import { useUserSubscriptions } from '../../stores/user/subscriptions'
import { APP_STATES } from '../../ducks/Updates/reducers'

export default ({ pathname }) => {
  const [svelte, setSvelte] = useState()
  const [searchNode, setSearchNode] = useState()
  const [notificationsNode, setNotificationsNode] = useState()
  const ref = useRef()
  const { user } = useUser()
  const { subscriptions } = useUserSubscriptions()
  const currentUser = useMemo(() => {
    if (user) user.subscriptions = subscriptions || []
    return user
  }, [user, subscriptions])
  const variant = useGoogleOptimize('CG6tK8zVQ9Ww9wb7WJtYmg', [0, 1, 2], 1000)
  const appVersionState = useSelector((state) => state.app.appVersionState)
  const isAppUpdateAvailable = appVersionState === APP_STATES.NEW_AVAILABLE

  useEffect(() => {
    const svelte = new Navbar({
      target: ref.current,
      props: { pathname, currentUser, mount: onMount, isAppUpdateAvailable, variant },
    })
    setSvelte(svelte)
    return () => svelte.$destroy()
  }, [])

  useEffect(() => {
    if (!svelte) return

    svelte.$set({ pathname, currentUser })
  }, [pathname, currentUser, subscriptions])

  function onMount(searchNode, notificationsNode) {
    setSearchNode(searchNode)
    setNotificationsNode(notificationsNode)
  }

  return (
    <div ref={ref} className='header'>
      {searchNode && ReactDOM.createPortal(<Search />, searchNode)}
      {notificationsNode && ReactDOM.createPortal(<NotificationsFeed />, notificationsNode)}
    </div>
  )
}
