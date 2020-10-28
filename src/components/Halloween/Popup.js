import React, { useState, useEffect } from 'react'
import copy from 'copy-to-clipboard'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import Panel from '@santiment-network/ui/Panel'
import Congrats from '../Illustrations/Congrats'
import Gift from '../Illustrations/Gift'
import Rocket from '../Illustrations/Rocket'
import styles from './index.module.scss'

const DISCOUND_CODE = 'SAN_HALLOWEEN30'

const STEPS = [
  {
    title: 'You dug the first grave!',
    description:
      'Work with your hands more: find 2 more graves to get a gift from Santiment',
    button: "Let's continue!",
    img: Rocket
  },
  {
    title: "You're rock!",
    description:
      'Dug the final grave and you win this small game. Your award is somewhere near...',
    button: 'Go, go, go!',
    img: Congrats
  },
  {
    title: 'Congratulations!',
    description: `You've worked a lot and here your discount for Sanbase - ${DISCOUND_CODE}`,
    button: 'Copy code to clipboard',
    img: Gift
  }
]

const HalloweenPopup = ({ activeNumber }) => {
  const [isOpen, setOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(
    () => {
      if (!activeNumber && isOpen) {
        setOpen(false)
      }

      if (activeNumber && !isOpen) {
        setOpen(true)
      }
    },
    [activeNumber]
  )

  const Img = STEPS[activeNumber - 1].img

  return (
    <Dialog
      title=''
      open={isOpen}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      classes={styles}
    >
      <Panel padding className={styles.container}>
        <Img />
        <div className={styles.join}>{STEPS[activeNumber - 1].title}</div>
        <div className={styles.description}>
          {STEPS[activeNumber - 1].description}
        </div>
        <Button
          onClick={() => {
            if (activeNumber === 3) {
              copy(DISCOUND_CODE)
              setIsCopied(true)
            } else {
              setOpen(false)
              setIsCopied(false)
            }
          }}
          variant='fill'
          accent='positive'
          className={styles.btn}
        >
          {activeNumber === 3 && isCopied
            ? 'Copied!'
            : STEPS[activeNumber - 1].button}
        </Button>
      </Panel>
    </Dialog>
  )
}

export default HalloweenPopup
