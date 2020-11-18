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
      'I’ve yet to find another site that lets me chart full historical data and indicators from 3 or 4 completely different sources on a single graph, and make it simple to find new correlations that I couldn’t see otherwise. If you want to get the full picture of the market, you need to tap into all information sources available, and that’s what Sanbase lets me do'
  },
  {
    author: 'John Morgan, FL',
    pic: 'default',
    text:
      'I’ve been trading/investing/hodling for 3 years next week, and your website/app is REAL. i wish i had this a long time ago'
  },
  {
    author: 'Panama_TJ',
    pic: 'default',
    text:
      'Santiment is definitely the data source I use for all of the on-chain analytics I need.'
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
