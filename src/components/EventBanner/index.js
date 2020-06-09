import React from 'react'
import cx from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import { ACTIVE_WIDGETS_QUERY } from './gql'
import styles from './index.module.scss'

const EventBanner = ({ className }) => {
  const { data: { activeWidgets = [] } = {} } = useQuery(ACTIVE_WIDGETS_QUERY)
  const activeWidget = activeWidgets.length > 0 ? activeWidgets[0] : null

  return activeWidget ? (
    <section className={cx(styles.wrapper, className)}>
      <div className={styles.media}>
        <a
          href={activeWidget.videoLink}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.link}
        >
          <img
            alt='Active widget'
            src={activeWidget.imageLink}
            className={styles.img}
          />
        </a>
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>{activeWidget.title}</h4>
        <p className={styles.desc}>{activeWidget.description}</p>
      </div>
    </section>
  ) : null
}

export default EventBanner
