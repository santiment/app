import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

const testimonials = [
  {
    author: 'John Morgan, FL',
    alias: 'JM',
    pic: 'default',
    position: 'Trader',
    text:
      'I’ve been trading / investing / hodling for 3 years next week, and your website/app is REAL. i wish i had this a long time ago'
  },
  {
    author: 'Peter Sikuda',
    pic: 'petersik',
    position: 'Investor',
    text:
      'I’ve yet to find another site that lets me chart full historical data and indicators from 3 or 4 completely different sources on a single graph, and make it simple to find new correlations that I couldn’t see otherwise. If you want to get the full picture of the market, you need to tap into all information sources available, and that’s what Sanbase lets me do'
  },
  {
    author: 'Panama_TJ',
    alias: 'PC',
    pic: 'panama_crypto',
    position: 'Trader',
    text:
      'Santiment is definitely the data source I use for all of the on-chain analytics I need.'
  },
  {
    author: 'CRYPTO₿IRB',
    pic: 'cryptobirb',
    position: 'Certified Technical Analyst',
    text:
      "Santiment is by far my favorite go-to place when I want to enrich my market analysis with on-chain insights. The platform itself shows an insane variety of tools and indicators that actually let me decide when to lock in profits before potential trend reversals come. I love it with all my analyst's heart!"
  }
]

const BgImage = (
  <svg
    className={styles.bgImg}
    width='99'
    height='81'
    viewBox='0 0 99 81'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M28.8453 0C12.464 11.8274 0 31.8982 0 53.7611C0 71.323 10.3273 81 22.0791 81C32.7626 81 40.9532 72.3982 40.9532 62.0044C40.9532 51.2522 33.8309 43.7257 23.8597 43.7257C22.0791 43.7257 19.5863 44.0841 19.2302 44.0841C20.2986 32.6151 30.6259 18.2788 42.0216 10.7522L28.8453 0ZM85.8237 0C69.4425 11.8274 56.9784 31.8982 56.9784 53.7611C56.9784 71.323 67.3058 81 79.0576 81C89.741 81 98.2878 72.3982 98.2878 62.0044C98.2878 51.2522 90.8094 43.7257 80.8381 43.7257C79.0576 43.7257 76.5648 44.0841 76.2086 44.0841C77.6331 32.6151 87.6043 18.2788 99 10.7522L85.8237 0Z'
      fill='var(--athens)'
    />
  </svg>
)

const Testimonials = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Testimonials</h2>
      <div className={styles.description}>
        Our users send us bunch of smiles with our services, just read some of
        the reviews!
      </div>

      <div className={styles.list}>
        {testimonials.map((item, index) => (
          <Testimonial item={item} key={index} />
        ))}
      </div>
    </section>
  )
}

const Testimonial = ({ item }) => {
  const { author, alias, text, position, pic } = item

  return (
    <div key={author} className={styles.testimonial}>
      <div className={styles.text}>{text}</div>

      <div className={styles.bottom}>
        <div
          className={cx(
            styles.pic,
            styles[`pic_${pic}`],
            pic === 'default' && styles.pic__default
          )}
        >
          {pic === 'default' && alias}
        </div>
        <div className={styles.author}>
          <div className={styles.author__name}>{author}</div>
          <div className={styles.author__description}>{position}</div>
        </div>
      </div>

      {BgImage}
    </div>
  )
}

export default Testimonials
