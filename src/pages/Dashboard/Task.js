import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import styles from './Task.module.scss'

const Task = ({ title, text, icon, iconClassName, isCompleted }) => (
  <Panel className={cx(styles.task, !isCompleted && styles.selectable)}>
    <div className={styles.icon}>
      <Icon type={icon} className={iconClassName} />
    </div>
    <div className={styles.title}>{title}</div>
    <div className={styles.text}>{text}</div>
    <div className={cx(styles.state, isCompleted && styles.completed)}>
      <Icon type='checkmark' />
    </div>
  </Panel>
)

export default Task
