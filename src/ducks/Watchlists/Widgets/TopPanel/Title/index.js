import React from 'react'
import HelpPopup from '../../../../../components/HelpPopup/HelpPopup'
import styles from './index.module.scss'

const Title = ({ name, watchlist, isDefaultScreener }) => {
  const title = isDefaultScreener ? 'My screener' : watchlist.name || name
  return (
    <>
      <h1 className={styles.name}>{title}</h1>
      {watchlist.description && (
        <HelpPopup triggerClassName={styles.description}>
          {watchlist.description}
        </HelpPopup>
      )}
    </>
  )
}

export default Title
