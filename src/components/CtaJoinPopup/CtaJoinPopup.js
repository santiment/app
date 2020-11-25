import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import Panel from '@santiment-network/ui/Panel'
import { useUser } from '../../stores/user'
import { PATHS } from '../../paths'
import Rocket from '../Illustrations/Rocket'
import styles from './CtaJoinPopup.module.scss'

const CTA_JOIN_POPUP = 'CTA_JOIN_POPUP'
const TIMEOUT = 2 * 60 * 1000

const CtaJoinPopup = () => {
  const { isLoggedIn, loading } = useUser()
  const [isOpen, setOpen] = useState(false)

  const isShown = localStorage.getItem(CTA_JOIN_POPUP)

  useEffect(
    () => {
      if (isLoggedIn || isShown) return

      const timeoutId = setTimeout(() => {
        setOpen(true)
        localStorage.setItem(CTA_JOIN_POPUP, '+')
      }, TIMEOUT)
      return () => clearTimeout(timeoutId)
    },
    [isLoggedIn]
  )

  if (loading || isLoggedIn) return null

  return (
    <Dialog
      title=''
      open={isOpen}
      preventCloseOnDimmedFromStart
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      classes={styles}
    >
      <Panel padding className={styles.container}>
        <Rocket />
        <div className={styles.join}>Join our community!</div>
        <div className={styles.description}>
          Santiment is a behavior analytics platform for cryptocurrencies,
          sourcing on-chain, social and development information on 900+ coins.
          Sign up now to get 14 days free for Sanbase PRO!
        </div>
        <Button
          as={Link}
          to={PATHS.CREATE_ACCOUNT}
          variant='fill'
          accent='positive'
          className={styles.btn}
        >
          Start crypto journey
        </Button>
      </Panel>
    </Dialog>
  )
}

export default CtaJoinPopup
