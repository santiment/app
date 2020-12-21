import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Copy from '../../ducks/Watchlists/Actions/Copy'
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './index.module.scss'

export default ({ watchlist }) => {
  return (
    <Copy
      id={watchlist.id}
      trigger={
        <div className={cx(styles.action, styles.action__withLine)}>
          <ExplanationTooltip
            text='Copy assets to watchlist'
            offsetY={10}
            className={styles.action__tooltip}
          >
            <Icon type='copy' />
          </ExplanationTooltip>
        </div>
      }
    />
  )
}
