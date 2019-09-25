import React, { useState, useRef } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import YoutubeButton from './YoutubeButton'
import styles from './StoryContent.module.scss'

const StoryContent = ({
  slides,
  active,
  onNext,
  onPrev,
  onMediaClicked,
  isPaused
}) => {
  const {
    title,
    description,
    buttonText,
    buttonLink,
    image,
    videoId,
    isDarkImage
  } = slides[active]

  let [width, setWidth] = useState(null)
  const activeStoryRef = useRef(null)
  const videoRef = useRef(null)

  if (isPaused && !width) {
    const elem = activeStoryRef.current.children[active].children[0]
    setWidth(elem.offsetWidth)
  }

  if (!isPaused && width) setWidth(null)

  const onVideoClicked = () => {
    if (videoId && videoRef.current && !isPaused) {
      let iframe = document.createElement('iframe')

      iframe.setAttribute('allowfullscreen', '')
      iframe.setAttribute('allow', 'autoplay')
      iframe.setAttribute(
        'src',
        `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`
      )
      videoRef.current.appendChild(iframe)
      onMediaClicked()
    }
  }

  return (
    <>
      <div className={styles.content}>
        <div
          className={cx(
            styles.media,
            isDarkImage && styles.dark,
            isPaused && videoId && styles.enabledVideo
          )}
          onClick={onVideoClicked}
          ref={videoRef}
        >
          {videoId && (
            <div className={styles.preview}>
              <img
                className={styles.preview__img}
                src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                alt={title}
              />
              <YoutubeButton />
            </div>
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
                '--width': isPaused ? `${width}px` : active === idx ? '100%' : 0
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default StoryContent
