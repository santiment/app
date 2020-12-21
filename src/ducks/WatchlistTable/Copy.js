import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Copy from '../Watchlists/Actions/Copy'
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './index.module.scss'

export const CopyButton = ({ ...props }) => (
  <div {...props} className={cx(styles.action)}>
    <ExplanationTooltip
      text='Copy assets to watchlist'
      offsetY={10}
      className={styles.explanation}
    >
      <Icon type='copy' className={styles.action__icon} />
    </ExplanationTooltip>
  </div>
)

const CopyPopupTrigger = ({ watchlist }) => (
  <Copy id={watchlist.id} trigger={<CopyButton />} />
)

export default CopyPopupTrigger
