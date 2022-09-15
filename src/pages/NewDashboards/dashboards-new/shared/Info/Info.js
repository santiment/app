import React from 'react'
import cx from 'classnames'
import Share from '../Share/Share'
import styles from './Info.module.scss'

const Info = ({ title, description }) => (
  <article className={cx(styles.wrapper, 'row')}>
    <div className={cx(styles.info)}>
      <h4 className='h4 txt-b mrg-m mrg--b'>{title}</h4>
      <p>{description}</p>
    </div>
    <div className={cx(styles.share, 'column')}>
      <p className='nowrap txt-m txt-right c-waterloo mrg-m mrg--b'>Share on social media</p>
      <Share text={description} />
    </div>
  </article>
)

export default Info
