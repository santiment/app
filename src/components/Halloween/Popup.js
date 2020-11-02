import React, { useState, useEffect } from 'react'
import copy from 'copy-to-clipboard'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import Panel from '@santiment-network/ui/Panel'
import Congrats from '../Illustrations/Congrats'
import Gift from '../Illustrations/Gift'
import Rocket from '../Illustrations/Rocket'
import styles from './index.module.scss'

const DISCOUND_CODE = 'pumpkin40'
const PERCENT_DISCOUNT = '40'

const STEPS = [
  {
    title: 'You’ve dug your first grave!',
    description: ({ name }) =>
      `You just saved ${name} from early market death 💀
Dig 2 more graves to get a gift from Santiment!`,
    button: 'Keep digging  ⛏️',
    img: Rocket
  },
  {
    title: 'One grave left!',
    description: () => `You've resurrected 2 coins - one more and the prize is yours!
The night is getting darker...👻`,
    button: 'Go, go, go!',
    img: Congrats
  },
  {
    title: 'Congratulations!',
    description: () => `To celebrate Halloween, we’re gifting you a one-time discount code for Sanbase Pro - "${DISCOUND_CODE}".
Use the code during checkout and get ${PERCENT_DISCOUNT}% off Sanbase Pro!🎁
`,
    button: 'Copy code to clipboard',
    img: Gift
  }
]

const HalloweenPopup = ({ activeNumber, name }) => {
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
  const Description = STEPS[activeNumber - 1].description

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
          <Description name={name} />
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
