import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import SaveAs from '../../ducks/Watchlists/Actions/SaveAs'
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './index.module.scss'

export default ({ watchlist, items }) => {
  function createWatchlist () {}

  return (
    <SaveAs
      watchlist={watchlist}
      lists={[]}
      type='watchlist'
      createWatchlist={console.log}
      trigger={
        <div className={cx(styles.action, styles.action__saveAs)}>
          <ExplanationTooltip
            text='Save as watchlist'
            offsetY={10}
            className={styles.action__tooltip}
          >
            <Icon type='add-watchlist' />
          </ExplanationTooltip>
        </div>
      }
    />
  )
}
