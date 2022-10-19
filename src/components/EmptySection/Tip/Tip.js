import React from 'react'
import cx from 'classnames'
import { MobileOnly } from '../../Responsive'
import tip from '../../../assets/tip.svg'
import styles from './tip.module.scss'

const Tip = ({ className, action }) => (
  <MobileOnly>
    <section className={cx(styles.tipWrapper, 'row', className)}>
      <img src={tip} alt='tip' className={cx(styles.tipImg, 'mrg-m mrg--r')} />
      <article>
        <p className='body-2 txt-m mrg-xs mrg--b'>Go to desktop for full access!</p>
        <p className={styles.tipDescription}>
          Head to Sanbase’s desktop version for the ability to create watchlists, alerts, chart
          layouts, and the ability to edit and access more features!
        </p>
      </article>
      {action}
    </section>
  </MobileOnly>
)

export default Tip
