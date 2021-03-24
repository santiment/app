import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { PROJECT } from '../Watchlists/detector'
import SaveAs from '../Watchlists/Actions/SaveAs'
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './index.module.scss'

export const SaveAsButton = props => (
  <div {...props} className={cx(styles.action)}>
    <ExplanationTooltip
      text='Save as watchlist'
      offsetY={10}
      className={styles.explanation}
    >
      <Icon type='add-watchlist' className={styles.action__icon} />
    </ExplanationTooltip>
  </div>
)

const SaveAsPopupTrigger = ({ type, watchlist }) => (
  <SaveAs watchlist={watchlist} type={type} trigger={<SaveAsButton />} />
)

SaveAsPopupTrigger.defaultProps = {
  type: PROJECT
}

export default SaveAsPopupTrigger
