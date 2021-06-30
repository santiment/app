import React, { useState } from 'react'
import cx from 'classnames'
import { track } from 'webkit/analytics'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Sorry from './sorry.png'
import { POINTS, Event } from './utils'
import ContactUs from '../ContactUs/ContactUs'
import AccordionContent from '../AccordionContent'
import AutoresizeTextarea from '../AutoresizeTextarea'
import styles from './MissYouScreen.module.scss'

const ARR = []

function writeFeedback (feedback) {
  if (feedback) {
    track.event(Event.GiveFeedback, { feedback })
  }
}

const MissYouScreen = ({ closeDialog, nextScreen }) => {
  const [selectedPoints, setSelectedPoints] = useState(ARR)

  function togglePoint (point) {
    const points = new Set(selectedPoints)

    if (!points.delete(point)) {
      points.add(point)
      track.event(Event.SelectReason, { reason: point })
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
        <AccordionContent show={selectedPoints.length > 0}>
          <>
            <p className={cx(styles.text, styles.text__last)}>
              Just one last thing
            </p>
            <AutoresizeTextarea
              blurOnEnter
              rowsCount={3}
              name='feedback'
              placeholder='Your feedback'
              className={styles.textarea}
              onBlur={writeFeedback}
            />
          </>
        </AccordionContent>
      </section>
      <AccordionContent show={selectedPoints.length > 0}>
        <div className={styles.actions}>
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
        </div>
      </AccordionContent>
    </Dialog.ScrollContent>
  )
}

export default MissYouScreen
