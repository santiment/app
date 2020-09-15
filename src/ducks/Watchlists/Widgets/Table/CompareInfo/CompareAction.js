import React from 'react'
import Button from '@santiment-network/ui/Button'
import DarkTooltip from '../../../../../components/Tooltip/DarkTooltip'
import CompareDialog from '../CompareDialog/CompareDialog'
import styles from '../AssetsTable.module.scss'

const CompareTooltip = ({ disabledComparision }) => {
  return (
    <DarkTooltip
      align='center'
      position='top'
      on='hover'
      className={styles.tooltip}
      trigger={
        <div>
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

const CompareAction = ({ assets, disabledComparision }) => {
  if (disabledComparision) {
    return <CompareTooltip disabledComparision={disabledComparision} />
  }

  return (
    <CompareDialog
      assets={assets}
      trigger={
        <div>
          <CompareTooltip disabledComparision={disabledComparision} />
        </div>
      }
    />
  )
}

export default CompareAction
