import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip'
import SaveAsAction from '../../../../../../ducks/Watchlists/Actions/SaveAs'
import tableStyles from '../../AssetsTable.module.scss'
import styles from './Actions.module.scss'

const SaveAs = ({ selectedText, watchlist }) => {
  return (
    <div>
      <SaveAsAction
        trigger={
          <div>
            <DarkTooltip
              align='center'
              position='top'
              on='hover'
              className={tableStyles.tooltip_oneline}
              trigger={<Icon type='watchlist-plus' className={styles.icon} />}
            >
              Save {selectedText} as watchlist
            </DarkTooltip>
          </div>
        }
        type={watchlist.type}
        watchlist={watchlist}
        prefix='Save as'
      />
    </div>
  )
}

export default SaveAs
