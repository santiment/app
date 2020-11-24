import React, { useEffect, useRef } from 'react'
import Slider from 'react-slick'
import Icon from '@santiment-network/ui/Icon'
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'
import DesktopTweets from './DesktopTweets/DesktopTweets'
import { TweetCard, TweetsParsed } from './Tweets'
import styles from './TwitterFeedbacks.module.scss'

export const SLIDER_SETTINGS = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
}

export const useSlider = () => {
  const slider = useRef(null)
  const slickNext = () => {
    slider.current.slickNext()
  }
  const slickPrev = () => {
    slider.current.slickPrev()
  }

  return { slider, slickNext, slickPrev }
}

const TwitterBg = ({ className }) => (
  <Icon type='twitter' className={className} />
)

const TwitterFeedbacks = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    document.body.appendChild(script)
  }, [])

  const { slider } = useSlider()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TwitterBg className={styles.headerBg} />
        <div className={styles.title}>
          <TwitterBg className={styles.twitterBlue} />
          More reviews from Twitter
        </div>
      </div>
      <DesktopOnly>
        <div className={styles.list}>
          <DesktopTweets />
        </div>
      </DesktopOnly>

      <MobileOnly>
        <div className={styles.slider}>
          <Slider {...SLIDER_SETTINGS} ref={slider}>
            {TweetsParsed.map((item, index) => (
              <TweetCard item={item} key={index} />
            ))}
          </Slider>
        </div>
      </MobileOnly>
    </div>
  )
}

export default TwitterFeedbacks
