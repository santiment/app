import React from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Icon from '@santiment-network/ui/Icon'
import styles from './FeedHelpPopup.module.scss'

const FeedHelpPopup = () => (
  <Dialog
    className={styles.tooltip}
    position='center'
    title='About Santiment’s Feed'
    trigger={
      <div className={styles.trigger}>
        <Icon type='question-round-small' className={styles.description} />
      </div>
    }
  >
    <div className={styles.container}>
      This is a continuous stream of updates on cryptocurrency assets, your
      personal watchlists and general market conditions, using various Santiment
      metrics and tools
    </div>
  </Dialog>
)

export default FeedHelpPopup
