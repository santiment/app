import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import DarkTooltip from '../../../../../components/Tooltip/DarkTooltip'
import styles from './index.module.scss'

const ResetButton = ({ onClick }) => {
  return (
    <span onClick={onClick} className={styles.reset}>
      <DarkTooltip
        position='top'
        align='center'
        on='hover'
        onClick={onClick}
        trigger={<Icon type='history-clear' />}
      >
        Reset to default state
      </DarkTooltip>
    </span>
  )
}

export default ResetButton
