import React from 'react'
import styles from './index.module.scss'

const showIntercom = () => window.Intercom('show')

const Intercom = ({ isDesktop }) =>
  isDesktop ? (
    <div className={styles.wrapper} onClick={showIntercom}>
      <svg
        className={styles.icon}
        width='14'
        height='16'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M14 16l-4.3-1.7h-8c-1 0-1.7-.8-1.7-1.8V1.8C0 .8.8 0 1.7 0h10.6c1 0 1.7.8 1.7 1.8V16zm-2-6a.4.4 0 00-.7 0S9.8 11.3 7 11.3a6.8 6.8 0 01-4.4-1.4.4.4 0 00-.5.1.5.5 0 000 .7S4 12.3 7 12.3c3.1 0 4.8-1.5 4.9-1.6l.1-.3V10z' />
      </svg>
      Help & Feedback
    </div>
  ) : null

export default Intercom
