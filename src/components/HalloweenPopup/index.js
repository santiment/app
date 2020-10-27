import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import Panel from '@santiment-network/ui/Panel'
import { useUser } from '../../stores/user'
import { PATHS } from '../../paths'
import Congrats from '../Illustrations/Congrats'
import Gift from '../Illustrations/Gift'
import Rocket from '../Illustrations/Rocket'
import styles from './index.module.scss'

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
    description:
      "You've worked a lot and here your discount for Sanbase - HALLOWEEN30",
    button: 'Copy discount to clipboard',
    img: Gift
  }
]

const HalloweenPopup = ({ activeNumber }) => {
  const [isOpen, setOpen] = useState(false)

  useEffect(
    () => {
      console.log(activeNumber)
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
          onClick={() => setOpen(false)}
          variant='fill'
          accent='positive'
          className={styles.btn}
        >
          {STEPS[activeNumber - 1].button}
        </Button>
      </Panel>
    </Dialog>
  )
}

export default HalloweenPopup
