import React from 'react'
import HelpPopup from '../../../../../components/HelpPopup/HelpPopup'
import styles from './index.module.scss'

const Title = ({ name, watchlist }) => (
  <>
    <h1 className={styles.name}>{watchlist.name || name}</h1>
    {watchlist.description && (
      <HelpPopup triggerClassName={styles.description}>
        {watchlist.description}
      </HelpPopup>
    )}
  </>
)

export default Title
