import React from 'react'
import cx from 'classnames'
import styles from './Info.module.scss'

const Info = ({ title, description }) => {
  return (
    <article className={cx(styles.wrapper, 'row')}>
      <div className={cx(styles.info)}>
        <h4>Social tool</h4>
        <p>
          Explore the social volume of any word on crypto social media. You can also look at
          individual platform data, including Telegram, Twitter, and Reddit. Compare words and
          assets, and check any common words that have been frequently used alongside the coin’s or
          trending word’s name.
        </p>
      </div>
      <div className={cx(styles.share)}>
        <p></p>
      </div>
    </article>
  )
}

export default Info
