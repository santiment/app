import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import styles from './Story.module.scss'

const Story = ({ story = {}, open, onClose }) => {
  const { slides } = story
  let [active, setActive] = useState(0)
  const amount = slides.length
  const { title, description, buttonText, buttonLink, image, video } = slides[
    active
  ]

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
      {amount > 1 && (
        <>
          <div
            className={styles.next}
            onClick={() => setActive(Math.min(amount - 1, active + 1))}
          >
            <Icon type='arrow-right-big' />
          </div>
          <div
            className={styles.prev}
            onClick={() => setActive(Math.max(0, active - 1))}
          >
            <Icon type='arrow-left-big' />
          </div>
          <div className={styles.lines} style={{ '--amount': slides.length }}>
            {slides.map((slide, idx) => (
              <span
                key={idx}
                className={cx(styles.line, active > idx && styles.full)}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Story
