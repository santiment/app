import React from 'react'
import Tooltip from '@santiment-network/ui/Tooltip'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import HelpPopupContent from './HelpPopupContent'
import styles from './HelpPopup.module.scss'

const HelpPopup = () => (
  <Tooltip
    className={styles.tooltip}
    align='center'
    on='click'
    trigger={
      <div className={styles.trigger}>
        <Icon type='question-round-small' className={styles.description} />
        <span>How to use</span>
      </div>
    }
  >
    <Panel padding className={styles.container}>
      <HelpPopupContent />
    </Panel>
  </Tooltip>
)

export default HelpPopup
