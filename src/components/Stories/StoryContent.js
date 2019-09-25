import React, { useState, useRef } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import styles from './StoryContent.module.scss'

const StoryContent = ({
  slides,
  active,
  onNext,
  onPrev,
  onMediaClicked,
  isPaused
}) => {
  const { title, description, buttonText, buttonLink, image, videoId } = slides[
    active
  ]

  let [width, setWidth] = useState(null)
  const activeStoryRef = useRef(null)

  if (isPaused && !width) {
    const elem = activeStoryRef.current.children[active].children[0]
    setWidth(elem.offsetWidth)
  }

  if (!isPaused && width) setWidth(null)

  return (
    <>
      <div className={styles.content}>
        <div className={styles.media}>
          {videoId && (
            <iframe
              onClick={onMediaClicked}
              title={title}
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              frameBorder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
            // <a className={styles.video} href={`https://youtu.be/${videoId}`}>
            //   <picture>
            //     <source srcset={`https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`} type="image/webp" />
            //     <img className={styles.videoMedia} src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`} alt={title} />
            //   </picture>
            // </a>
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
      {active < slides.length - 1 && (
        <div className={styles.next} onClick={onNext}>
          <Icon type='arrow-right-big' />
        </div>
      )}
      {active >= 1 && (
        <div className={styles.prev} onClick={onPrev}>
          <Icon type='arrow-left-big' />
        </div>
      )}
      <div
        className={styles.lines}
        style={{ '--amount': slides.length }}
        ref={activeStoryRef}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={cx(styles.line, active > idx && styles.full)}
          >
            <div
              className={cx(
                styles.progress,
                active === idx && !isPaused && styles.activeLine
              )}
              style={{
                '--width': isPaused && active === idx ? `${width}px` : 0
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default StoryContent
