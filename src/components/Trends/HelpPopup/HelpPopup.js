import React from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Icon from '@santiment-network/ui/Icon'
import HelpPopupContent from './HelpPopupContent'
import styles from './HelpPopup.module.scss'

const HelpPopup = () => (
  <Dialog
    className={styles.tooltip}
    position='center'
    title='About Santiment’s Top 10 Trending Words in Crypto'
    trigger={
      <div className={styles.trigger}>
        <Icon type='question-round' className={styles.description} />
      </div>
    }
  >
    <div padding className={styles.container}>
      <HelpPopupContent />
    </div>
  </Dialog>
)

export default HelpPopup
