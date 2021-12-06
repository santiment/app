import React, { useState } from 'react'
import Icon from '@santiment-network/ui/Icon'
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip'
import tableStyles from '../../AssetsTable.module.scss'
import styles from './Actions.module.scss'

const Delete = ({ selected, onRemove, selectedText }) => {
  const [loading, setLoading] = useState(false)

  function onClick () {
    if (loading) return
    setLoading(true)
    onRemove(selected, () => setLoading(false))
  }

  return (
    <DarkTooltip
      align='center'
      position='top'
      on='hover'
      className={tableStyles.tooltip_oneline}
      trigger={
        <div onClick={onClick}>
          <Icon type='remove' className={styles.remove} />
        </div>
      }
    >
      Delete {selectedText} from the watchlist
    </DarkTooltip>
  )
}

export default Delete
