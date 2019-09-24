import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import styles from './Story.module.scss'

const Story = ({ story = {}, open, onEnd }) => {
  const { slides } = story
  let [active, setActive] = useState(0)
  let [stop, setStop] = useState(false)
  const amount = slides.length
  const { title, description, buttonText, buttonLink, image, video } = slides[
    active
  ]

  useInterval(
    () => {
      const next = active + 1
      console.log(next)
      if (next === amount) {
        onEnd()
      } else {
        setActive(Math.min(amount - 1, active + 1))
      }
    },
    stop ? null : 15000
  )

  return (
    <>
      <div className={styles.content}>
        <div className={styles.media}>
          {video && (
            <iframe
              title={title}
              src={video}
              frameBorder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          )}
          {image && <img src={image} alt='' />}
        </div>
        {title && <h4 className={styles.title}>{title}</h4>}
        {description && <p className={styles.description}>{description}</p>}
        {buttonLink && (
          <Button
            as='a'
            href={buttonLink}
            rel='noopener noreferrer'
            target='_blank'
            variant='fill'
            accent='positive'
            className={styles.button}
          >
            {buttonText}
          </Button>
        )}
      </div>
      {active < amount - 1 && (
        <div
          className={styles.next}
          onClick={() => {
            setActive(Math.min(amount - 1, active + 1))
            setStop(true)
            setStop(false)
          }}
        >
          <Icon type='arrow-right-big' />
        </div>
      )}
      {active >= 1 && (
        <div
          className={styles.prev}
          onClick={() => setActive(Math.max(0, active - 1))}
        >
          <Icon type='arrow-left-big' />
        </div>
      )}
      <div className={styles.lines} style={{ '--amount': slides.length }}>
        {slides.map((slide, idx) => (
          <span
            key={idx}
            className={cx(
              styles.line,
              active > idx && styles.full,
              active === idx && styles.activeLine
            )}
          />
        ))}
      </div>
    </>
  )
}

function useInterval (callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(
    () => {
      savedCallback.current = callback
    },
    [callback]
  )

  // Set up the interval.
  useEffect(
    () => {
      function tick () {
        savedCallback.current()
      }

      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    },
    [delay]
  )
}

export default Story
