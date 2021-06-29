import React, { useState } from 'react'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Sorry from './sorry.png'
import ContactUs from '../ContactUs/ContactUs'
import AutoresizeTextarea from '../AutoresizeTextarea'
import styles from './MissYouScreen.module.scss'

const POINTS = [
  'Found other tool that fits my needs better',
  'I don’t need all the features',
  'Too difficult to use',
  'Too expensive',
  'Other'
]

const ARR = []

const MissYouScreen = ({ closeDialog, nextScreen }) => {
  const [selectedPoints, setSelectedPoints] = useState(ARR)

  function togglePoint (point) {
    const points = new Set(selectedPoints)

    if (!points.delete(point)) {
      points.add(point)
    }

    setSelectedPoints([...points])
  }

  return (
    <Dialog.ScrollContent className={styles.wrapper}>
      <h2 className={styles.title}>
        We’re sorry to see you go
        <img src={Sorry} alt='sad_emoji' width={28} height={29} />
      </h2>
      <section className={styles.section}>
        <p className={styles.text}>Help us understand why:</p>
        {POINTS.map(point => (
          <div
            className={styles.point}
            key={point}
            onClick={() => togglePoint(point)}
          >
            <Checkbox isActive={selectedPoints.includes(point)} />
            <span className={styles.point__text}>{point}</span>
          </div>
        ))}
        {selectedPoints.length > 0 && (
          <>
            <p className={styles.text__last}>Just one last thing</p>
            <AutoresizeTextarea
              blurOnEnter
              rowsCount={3}
              name='feedback'
              placeholder='Your feedback'
              className={styles.textarea}
              onBlur={text => console.log(text)}
            />
          </>
        )}
      </section>
      <div className={styles.actions}>
        {selectedPoints.length > 0 && (
          <>
            <ContactUs
              variant='fill'
              accent='positive'
              onClick={closeDialog}
              className={styles.btn}
            >
              Maybe we can help with that?
            </ContactUs>
            <Button accent='positive' onClick={nextScreen}>
              Cancel subscription
            </Button>
          </>
        )}
      </div>
    </Dialog.ScrollContent>
  )
}

export default MissYouScreen
