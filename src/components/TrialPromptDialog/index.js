import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import Panel from '@santiment-network/ui/Panel'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import styles from './index.module.scss'

const TRIAL_PROMPT_SHOWN = 'TRIAL_PROMPT_SHOWN'
const TIMEOUT = 60 * 1000

const Checkmark = () => (
  <svg
    className={styles.check}
    width='24'
    height='24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='12' cy='12' r='12' fill='#EDF8F5' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.278 8.64a.5.5 0 01.013.707l-5.786 6a.5.5 0 01-.733-.014l-3.214-3.6a.5.5 0 01.746-.666l2.855 3.198 5.412-5.612a.5.5 0 01.707-.013z'
      fill='#14C393'
    />
  </svg>
)

const TrialPromptDialog = () => {
  const { loading, isEligibleForSanbaseTrial } = useUserSubscriptionStatus()
  const [isOpen, setOpen] = useState(false)

  const open = () => setOpen(true)
  const close = () => setOpen(false)

  useEffect(
    () => {
      const isShown = localStorage.getItem(TRIAL_PROMPT_SHOWN)
      if (!isEligibleForSanbaseTrial || isShown) return

      const timeoutId = setTimeout(() => {
        open()
        localStorage.setItem(TRIAL_PROMPT_SHOWN, '+')
      }, TIMEOUT)
      return () => clearTimeout(timeoutId)
    },
    [isEligibleForSanbaseTrial]
  )

  if (loading || !isEligibleForSanbaseTrial) return null

  return (
    <Dialog
      title=''
      open={isOpen}
      preventCloseOnDimmedFromStart
      onOpen={open}
      onClose={close}
      classes={styles}
    >
      <Panel padding className={styles.container}>
        <div className={styles.header}>Start your free trial</div>

        <div className={styles.right}>
          <div className={styles.feature}>
            <Checkmark />
            Full historical and present-day data for 100+
            <br />
            on-chain, social and development metrics
          </div>
          <div className={styles.feature}>
            <Checkmark />
            Exclusive insights and weekly market
            <br />
            reports from Santiment team
          </div>
          <div className={styles.feature}>
            <Checkmark />
            Full access to our Spreadsheets plugin with
            <br />
            dozens of pre-made templates
          </div>

          <Button
            as={Link}
            to='/pricing'
            variant='fill'
            accent='positive'
            className={styles.btn}
            onClick={close}
          >
            Start crypto journey
          </Button>
          <div className={styles.description}>
            14 days free of Sanbase Pro, no charges untill the trial is ended
          </div>
        </div>
      </Panel>
    </Dialog>
  )
}

export default TrialPromptDialog
