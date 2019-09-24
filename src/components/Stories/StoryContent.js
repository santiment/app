import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import styles from './StoryContent.module.scss'

const StoryContent = ({ slides, active, onNext, onPrev, amount }) => {
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
      {active < amount - 1 && (
        <div className={styles.next} onClick={onNext}>
          <Icon type='arrow-right-big' />
        </div>
      )}
      {active >= 1 && (
        <div className={styles.prev} onClick={onPrev}>
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

export default StoryContent
