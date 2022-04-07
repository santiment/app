import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip'
import CopyAction from '../../../../../../ducks/Watchlists/Actions/Copy'
import tableStyles from '../../AssetsTable.module.scss'
import styles from './Actions.module.scss'

const Copy = ({ selectedText, watchlist, assets, selected }) => {
  const checkedAssetsMap = (s) =>
    watchlist.type === 'BLOCKCHAIN_ADDRESS' ? s.address : s.id.toString()
  return (
    <div>
      <CopyAction
        trigger={
          <div>
            <DarkTooltip
              align='center'
              position='top'
              on='hover'
              className={tableStyles.tooltip_oneline}
              trigger={<Icon type='copy' className={styles.icon} />}
            >
              Copy {selectedText} to watchlist
            </DarkTooltip>
          </div>
        }
        id={watchlist.id}
        type={watchlist.type}
        assets={assets}
        checkedAssets={new Set(selected.map(checkedAssetsMap))}
      />
    </div>
  )
}

export default Copy
