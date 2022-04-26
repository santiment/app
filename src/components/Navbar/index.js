import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Navbar.svelte'
import Search from './Search'
import NotificationsFeed from '../../ducks/Notifications/NotificationsFeed/NotificationsFeed'
import { useUser } from '../../stores/user'

export default ({ pathname }) => {
  const [svelte, setSvelte] = useState()
  const [searchNode, setSearchNode] = useState()
  const [notificationsNode, setNotificationsNode] = useState()
  const ref = useRef()
  const { user } = useUser()

  useEffect(() => {
    const svelte = new Navbar({
      target: ref.current,
      props: { pathname, currentUser: user, mount: onMount },
    })
    setSvelte(svelte)
    return () => svelte.$destroy()
  }, [])

  useEffect(() => {
    if (!svelte) return
    svelte.$set({ pathname, currentUser: user })
  }, [pathname, user])

  function onMount(searchNode, notificationsNode) {
    setSearchNode(searchNode)
    setNotificationsNode(notificationsNode)
  }

  return (
    <div ref={ref}>
      {searchNode && ReactDOM.createPortal(<Search />, searchNode)}
      {notificationsNode && ReactDOM.createPortal(<NotificationsFeed />, notificationsNode)}
    </div>
  )
}
