import React, { useState, useRef } from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { mapSizesToProps } from '../../utils/withSizes'
import YoutubeButton from './YoutubeButton'
import styles from './StoryContent.module.scss'

const StoryContent = ({
  slides,
  active,
  onNext,
  onPrev,
  onToggleSlide,
  onClick,
  onMediaClicked,
  isPaused,
  isPhone
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

  let [widthSlideProgress, setWidthSlideProgress] = useState(null)
  const activeStoryRef = useRef(null)
  const videoRef = useRef(null)

  if (isPaused && !widthSlideProgress) {
    const elem = activeStoryRef.current.children[active].children[0]
    setWidthSlideProgress(elem.offsetWidth)
  }

  if (!isPaused && widthSlideProgress) setWidthSlideProgress(null)

  const onVideoClicked = evt => {
    evt.stopPropagation()
    if (videoId && videoRef.current && !isPaused) {
      let iframe = document.createElement('iframe')

      iframe.setAttribute('allowfullscreen', '')
      iframe.setAttribute('allow', 'autoplay')
      iframe.setAttribute(
        'src',
        `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`
      )
      videoRef.current.appendChild(iframe)
      onMediaClicked(evt)
    }
    onClick && onClick()
  }

  const isNotLastSlide = active < slides.length - 1
  const isNotFirstSlide = active >= 1

  return (
    <>
      <div
        className={styles.content}
        onClick={isPhone ? onToggleSlide : onClick}
      >
        <div
          className={cx(
            styles.media,
            isDarkImage && styles.dark,
            isPaused && videoId && styles.enabledVideo
          )}
          onClick={isPhone ? () => {} : onVideoClicked}
          ref={videoRef}
        >
          {videoId && (
            <div className={styles.preview}>
              <img
                className={styles.preview__img}
                src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                alt={title}
              />
              <YoutubeButton
                onPlayClick={isPhone ? onVideoClicked : () => {}}
              />
            </div>
          )}
          {image && <img src={image} alt='' />}
        </div>
        {title && <h4 className={styles.title}>{title}</h4>}
        {description && <div className={styles.description}>{description}</div>}
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
      {isNotLastSlide && (
        <div className={styles.next} onClick={onNext}>
          <Icon type='arrow-right-big' />
        </div>
      )}
      {isNotFirstSlide && (
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
                '--width':
                  active === idx
                    ? isPaused
                      ? `${widthSlideProgress}px`
                      : '100%'
                    : 0
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default withSizes(mapSizesToProps)(StoryContent)
