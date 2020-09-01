import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import SidecarExplanationTooltip from '../../ducks/SANCharts/SidecarExplanationTooltip'
import styles from './TooltipWithImg.module.scss'
import tooltipStyles from './../../ducks/SANCharts/SidecarExplanationTooltip.module.scss'

const CloseTrigger = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cx(tooltipStyles.btn, styles.tooltipClose)}
    >
      <Icon type='close-medium' />
    </div>
  )
}

const TooltipWithImg = ({
  mark,
  onHide,
  children,
  img: tooltipImage,
  description
}) => {
  return (
    <SidecarExplanationTooltip
      closeTimeout={500}
      localStorageSuffix={mark}
      position='top'
      onHide={onHide}
      classes={styles}
      className={styles.tooltip}
      closeEl={CloseTrigger}
      arrowOffset={30}
      title={
        <div className={styles.content}>
          <img src={tooltipImage} alt='Tooltip' className={styles.img} />
          <div className={styles.description}>{description}</div>
        </div>
      }
      description=''
      withArrow
      delay={0}
    >
      {children}
    </SidecarExplanationTooltip>
  )
}

export default TooltipWithImg
