import React, { useRef } from 'react'
import cx from 'classnames'
import Slider from 'react-slick'
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
    author: 'Paolo Ardoino',
    pic: 'paolo',
    position: 'CTO at Bitfinex',
    text:
      'SANapi is one of the most comprehensive crypto APIs on the market. For us, it is incredibly easy to fetch various data sets like on-chain, social media and development info directly to Bitfinex through their unified API and across different blockchains. The Santiment team has worked hard on creating a stable, reliable and all-inclusive data source for crypto, and they’ve more than delivered.'
  },
  {
    author: 'Pramesh Tyagi',
    pic: 'pramesh',
    position: 'Director at ShillazTech',
    text:
      'After switching from stock trading to crypto, I realized that on-chain data of any crypto asset provides vital information about market participants beyond OHLCV. Using a combination of pricing and blockchain data via Santiment’s API, I was quickly able to develop hybrid trade signals that have proven highly reliable, effective and - most importantly - profitable.'
  },
  {
    author: 'Jan Smirny',
    pic: 'yan',
    position: 'Data Scientist',
    text:
      'I work with both the Sanpy python module and the ‘naked’ SAN API since both have their advantages. The GraphiQL API is great if you want very specific data for your research or pipeline implementations. For quick and easy data access for my research, the sanpy module is the place to go because (after the import) it is literally one line of code to get the data. It doesn’t get easier than that!'
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
              stroke='#181B2B'
              strokeWidth='2'
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
                <div className={cx(styles.pic, styles[`pic_${pic}`])} />
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
              strokeWidth='2'
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
