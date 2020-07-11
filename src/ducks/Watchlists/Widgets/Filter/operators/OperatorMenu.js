import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import Tooltip from '@santiment-network/ui/Tooltip'
import { Operator } from './index'
import styles from './OperatorMenu.module.scss'

const OperatorMenu = ({ operator, onChange }) => (
  <Tooltip
    on='click'
    trigger={
      <Button variant='flat' border className={styles.trigger}>
        <img
          src={Operator[operator].icon}
          alt='operator'
          className={styles.img}
        />
      </Button>
    }
    position='bottom'
    align='end'
    className={styles.tooltip}
  >
    <Panel className={styles.panel}>
      {Object.values(Operator).map(({ icon, label, isDisabled, key }) => (
        <Button
          key={key}
          variant='ghost'
          isDisabled={isDisabled}
          fluid
          className={cx(styles.button, isDisabled && styles.button__disabled)}
          onClick={() => (isDisabled ? null : onChange(key))}
        >
          <img src={icon} alt='operator' className={styles.img} />
          <span className={styles.label}>{label}</span>
        </Button>
      ))}
    </Panel>
  </Tooltip>
)

export default OperatorMenu
