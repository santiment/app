import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Navbar.svelte'
import Search from './Search'
import NotificationsFeed from '../../ducks/Notifications/NotificationsFeed/NotificationsFeed'
import { useUser } from '../../stores/user'
import { useUserSubscriptions } from '../../stores/user/subscriptions'

export default ({ pathname }) => {
  const [svelte, setSvelte] = useState()
  const [searchNode, setSearchNode] = useState()
  const [notificationsNode, setNotificationsNode] = useState()
  const ref = useRef()
  const { user } = useUser()
  const { subscriptions } = useUserSubscriptions()
  const currentUser = useMemo(() => {
    if (user) user.subscriptions = subscriptions
    return user
  }, [user, subscriptions])

  useEffect(() => {
    const svelte = new Navbar({
      target: ref.current,
      props: { pathname, currentUser, mount: onMount },
    })
    setSvelte(svelte)
    return () => svelte.$destroy()
  }, [])

  useEffect(() => {
    if (!svelte) return
    if (user) user.subscriptions = subscriptions

    svelte.$set({ pathname, currentUser })
  }, [pathname, user, subscriptions])

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
