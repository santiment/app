import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import Panel from '@santiment-network/ui/Panel'
import { useUser } from '../../stores/user'
import { PATHS } from '../../paths'
import Rocket from '../Illustrations/Rocket'
import styles from './CtaJoinPopup.module.scss'

const TIMEOUT = 2 * 60 * 1000

const CtaJoinPopup = () => {
  const { isLoggedIn, loading } = useUser()
  const [isOpen, setOpen] = useState(false)

  useEffect(
    () => {
      if (isLoggedIn) return

      const timeoutId = setTimeout(() => setOpen(true), TIMEOUT)
      return () => clearTimeout(timeoutId)
    },
    [isLoggedIn]
  )

  if (loading || isLoggedIn) return null

  return (
    <Dialog
      title=''
      open={isOpen}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      classes={styles}
    >
      <Panel padding className={styles.container}>
        <Rocket />
        <div className={styles.join}>Join our community!</div>
        <div className={styles.description}>
          Santiment provides custom metrics, insights metrics and data-driven
          strategies on 900+ cryptocurrencies.
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
