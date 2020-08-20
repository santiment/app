import React from 'react'
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip'
import styles from './index.module.scss'

const DeprecatedLabel = ({ isAuthor }) => {
  return (
    <DarkTooltip
      position='top'
      align='center'
      on='hover'
      className={styles.deprecated__tooltip}
      trigger={<span className={styles.deprecated__label}>OUTDATED</span>}
    >
      {`This metric no longer supported in screener${
        isAuthor ? '. Please, update your filter' : ''
      }`}
    </DarkTooltip>
  )
}

export default DeprecatedLabel
