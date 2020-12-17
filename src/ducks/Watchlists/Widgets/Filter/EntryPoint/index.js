import React from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { InputWithIcon as Input } from '@santiment-network/ui/Input'
import Panel from '@santiment-network/ui/Panel'
import styles from './index.module.scss'

const EntryPoint = ({ baseProjects }) => {
  const state = baseProjects || 'All assets'

  return (
    <div className={styles.wrapper}>
      <div className={styles.overview}>
        <span className={styles.title}>Entry point: </span>
        <span className={styles.explanation}>{state}</span>
      </div>
      <ContextMenu
        passOpenStateAs='data-isactive'
        position='bottom'
        align='start'
        className={styles.dropdown}
        trigger={
          <Input
            readOnly
            className={styles.trigger__btn}
            iconClassName={styles.trigger__arrow}
            icon='arrow-down'
            iconPosition='right'
            defaultValue={state}
          />
        }
      >
        <Panel className={styles.panel} />
      </ContextMenu>
    </div>
  )
}

export default EntryPoint
