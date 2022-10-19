import React from 'react'
import cx from 'classnames'
import ShareMedias from '../../../../../components/Share/medias/ShareMedias'
import styles from './Info.module.scss'

const Info = ({ title, description }) => (
  <article className={cx(styles.wrapper, 'row justify')}>
    <div className={cx(styles.info)}>
      <h4 className='h4 txt-b mrg-m mrg--b'>{title}</h4>
      <p>{description}</p>
    </div>
    <div className={cx(styles.share, 'column')}>
      <p className='nowrap txt-m txt-right c-waterloo mrg-m mrg--b'>Share on social media</p>
      <ShareMedias shareLink={window.location.href} shareText={description} isDashboard />
    </div>
  </article>
)

export default Info
