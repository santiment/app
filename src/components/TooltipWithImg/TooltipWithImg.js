import React, { Fragment } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import SidecarExplanationTooltip from '../../ducks/SANCharts/SidecarExplanationTooltip'
import tooltipStyles from './../../ducks/SANCharts/SidecarExplanationTooltip.module.scss'
import styles from './TooltipWithImg.module.scss'

const CloseTrigger = ({ onClick }) => (
  <div onClick={onClick} className={cx(tooltipStyles.btn, styles.tooltipClose)}>
    <Icon type='close-medium' />
  </div>
)

const TooltipWithImg = ({
  tooltipEl: TooltipEl = SidecarExplanationTooltip,
  mark,
  onHide,
  children,
  img: tooltipImage,
  description,
  className,
  as = Fragment,
  ...rest
}) => {
  return (
    <TooltipEl
      as={as}
      closeTimeout={500}
      localStorageSuffix={mark}
      position='top'
      onHide={onHide}
      classes={styles}
      className={cx(styles.tooltip, className)}
      closeEl={CloseTrigger}
      arrowOffset={32}
      content={
        <div className={styles.content}>
          <img src={tooltipImage} alt='Tooltip' className={styles.img} />
          <div className={styles.description}>{description}</div>
        </div>
      }
      description=''
      withArrow
      delay={0}
      {...rest}
    >
      {children}
    </TooltipEl>
  )
}

export default TooltipWithImg
