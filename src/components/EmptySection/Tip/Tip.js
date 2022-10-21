import React from 'react'
import cx from 'classnames'
import { MobileOnly } from '../../Responsive'
import tip from '../../../assets/tip.svg'
import styles from './tip.module.scss'

const Tip = ({ className, action }) => (
  <MobileOnly>
    <section className={cx(styles.tipWrapper, 'row', className)}>
      <img src={tip} alt='tip' className={cx(styles.tipImg, 'mrg-m mrg--r')} />
      <article className='body-2 mrg-xs mrg--b'>
        <div className='row justify v-center'>
          <p className='txt-m'>Go to desktop for full access!</p>
          {action}
        </div>
        <p className={cx(styles.tipDescription, 'mrg-l mrg--r')}>
          Head to Sanbase’s desktop version for the ability to create watchlists, alerts, chart
          layouts, and the ability to edit and access more features!
        </p>
      </article>
    </section>
  </MobileOnly>
)

export default Tip
