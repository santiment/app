import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import TemplateInfo from './TemplateDetailsDialog/TemplateInfo'
import styles from './Title.module.scss'

export const Info = ({ template }) => (
  <Tooltip
    position='top'
    align='start'
    on='click'
    offsetY={13}
    trigger={<Icon type='info-round' className={styles.info} />}
    className={styles.tooltip}
  >
    <TemplateInfo template={template} classes={styles} />
  </Tooltip>
)

const Title = ({ template }) => (
  <div className={styles.wrapper}>
    <Info template={template} />
    {template.title}
  </div>
)

Title.defaultProps = {
  template: {},
}

export default Title
