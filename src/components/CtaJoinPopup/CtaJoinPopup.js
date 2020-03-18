import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PATHS } from '../../App'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import joinImg from './../../../src/assets/join.svg'
import Panel from '@santiment-network/ui/Panel'
import { checkIsLoggedIn } from '../../pages/UserSelectors'
import styles from './CtaJoinPopup.module.scss'

const TIMEOUT = 2 * 60 * 1000

let timeoutId = null

const CtaJoinPopup = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return null
  }

  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    timeoutId = setTimeout(() => {
      if (!isLoggedIn) {
        setOpen(true)
      }
    }, TIMEOUT)

    return () => {
      timeoutId && clearTimeout(timeoutId)
    }
  }, [])

  return (
    <Dialog
      title=''
      open={isOpen}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      classes={styles}
    >
      <Panel padding className={styles.container}>
        <img src={joinImg} alt='Join' />

        <div className={styles.join}>Join the community!</div>
        <div className={styles.description}>
          Santiment is a behavior analytics platform for cryptocurrencies,
          sourcing on-chain, social and development information on 900+ coins.
          Sign up now to receive 20% discount!
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

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state)
})

export default connect(mapStateToProps)(CtaJoinPopup)
