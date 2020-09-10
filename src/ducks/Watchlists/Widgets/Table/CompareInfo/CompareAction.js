import React from 'react'
import Button from '@santiment-network/ui/Button'
import DarkTooltip from '../../../../../components/Tooltip/DarkTooltip'
import styles from '../AssetsTable.module.scss'

const CompareAction = ({ disabledComparision }) => {
  return (
    <DarkTooltip
      align='center'
      position='top'
      on='hover'
      className={styles.tooltip}
      trigger={
        <div className={styles.compareBtn}>
          <Button
            classes={{
              btnIcon: !disabledComparision && styles.compareIcon
            }}
            icon='compare'
            border
            disabled={disabledComparision}
          >
            Compare
          </Button>
        </div>
      }
    >
      Select at least 2 assets to able to compare
    </DarkTooltip>
  )
}

export default CompareAction
