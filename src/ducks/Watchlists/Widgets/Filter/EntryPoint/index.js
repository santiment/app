import React from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { InputWithIcon as Input } from '@santiment-network/ui/Input'
import Panel from '@santiment-network/ui/Panel'
import styles from './index.module.scss'

const EntryPoint = () => {
  return (
    <div className={styles.wrapper}>
      <span>Entry point: </span>
      <ContextMenu
        passOpenStateAs='data-isactive'
        position='bottom'
        align='start'
        className={styles.dropdown}
        trigger={
          <Input
            className={styles.trigger__btn}
            iconClassName={styles.trigger__arrow}
            icon='arrow-down'
            iconPosition='right'
            placeholder='All assets'
            // onChange={evt => {
            //   const { value } = evt.currentTarget
            //   setCurrentSearch(value)
            // }}
          />
        }
      >
        <Panel className={styles.panel} />
      </ContextMenu>
    </div>
  )
}

export default EntryPoint
