import React, { useRef } from 'react'
import cx from 'classnames'
import Slider from 'react-slick'
import Icon from '@santiment-network/ui/Icon'
import styles from './index.module.scss'

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
}

const testimonials = [
  {
    author: 'Peter Sikuda',
    pic: 'petersik',
    position: '@Petersik',
    text:
      'I’ve yet to find another site that lets me chart full historical data and indicators from 3 or 4 completely different sources on a single graph, and make it simple to find new correlations that I couldn’t see otherwise. If you want to get the full picture of the market, you need to tap into all information sources available, and that’s what Sanbase lets me do.'
  },
  {
    author: 'Anonymous person',
    pic: 'default',
    text:
      'The amount of data and deep metrics on Sanbase are an analyst’s dream. I love using their social media tools to backtest and develop new strategies. Meanwhile their custom signals help me react ASAP to trend shifts and market anomalies. If you want to understand crypto’s top movers and shakers, there’s few better tools out there.'
  },
  {
    author: 'Anonymous person',
    pic: 'default',
    text:
      'I’ve learned so much about market behavior and long and short-term coin trends by binging on Sanbase charts. Doesn’t matter if you’re a newbie or a veteran in the market, if you’re serious about crypto analysis Sanbase is a great place to validate your theories and test new data-driven approaches.'
  }
]

const Testimonials = () => {
  const slider = useRef(null)
  const slickNext = () => {
    slider.current.slickNext()
  }
  const slickPrev = () => {
    slider.current.slickPrev()
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>What people are saying</h2>
      <div className={styles.slider}>
        <div
          className={cx(styles.arrow, styles.arrow_left)}
          onClick={slickPrev}
        >
          <svg
            width='7'
            height='12'
            viewBox='0 0 7 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6 11L1 6L6 1'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <Slider {...settings} ref={slider}>
          {testimonials.map(({ author, text, position, pic }) => (
            <div key={author} className={styles.testimonial}>
              <div className={styles.slider__top}>
                <p className={styles.text}>{text}</p>
              </div>
              <div className={styles.slider__bottom}>
                <div className={cx(styles.pic, styles[`pic_${pic}`])}>
                  {pic === 'default' && <Icon type='profile' />}
                </div>
                <h3 className={styles.author}>{author}</h3>
                <h4 className={styles.position}>{position}</h4>
              </div>
            </div>
          ))}
        </Slider>

        <div
          className={cx(styles.arrow, styles.arrow_right)}
          onClick={slickNext}
        >
          <svg
            width='7'
            height='12'
            viewBox='0 0 7 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1 11L6 6L1 1'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
