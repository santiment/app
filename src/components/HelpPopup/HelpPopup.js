import React from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import Panel from '@santiment-network/ui/Panel'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { mapSizesToProps } from '../../utils/withSizes'
import styles from './HelpPopup.module.scss'

export const HelpPopupTrigger = (
  <Icon className={styles.trigger} type='question-round-small' />
)

const HelpPopup = ({
  children,
  content,
  className,
  wrapperClassName,
  position = 'bottom',
  align = 'center',
  trigger = HelpPopupTrigger,
  isPhone
}) => {
  const render = content || children

  return isPhone ? (
    <ContextMenu trigger={trigger}>
      <Panel className={styles.panel}>{render}</Panel>
    </ContextMenu>
  ) : (
    <Tooltip
      trigger={trigger}
      position={position}
      align={align}
      on='click'
      className={cx(styles.wrapper, className)}
    >
      <Panel className={styles.panel}>{render}</Panel>
    </Tooltip>
  )
}

export default withSizes(mapSizesToProps)(HelpPopup)
