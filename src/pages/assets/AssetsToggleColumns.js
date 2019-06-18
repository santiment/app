import React from 'react'
import {
  Button,
  Checkbox,
  ContextMenu,
  Icon,
  Panel
} from '@santiment-network/ui'
import styles from './AssetsToggleColumns.module.scss'

const AssetsToggleColumns = ({ columns = [], onChange }) => (
  <ContextMenu
    trigger={
      <Button fluid variant='flat' className={styles.button}>
        <Icon type='columns' />
      </Button>
    }
    passOpenStateAs='isActive'
    position='bottom'
    align='end'
  >
    <Panel variant='modal' className={styles.wrapper}>
      <div className={styles.heading}>Displayed asset attributes</div>
      <div className={styles.columns}>
        {Object.entries(columns).map(([id, { name, selectable, show }]) => (
          <div key={id} className={styles.column} onClick={() => onChange(id)}>
            <Checkbox
              className={styles.checkbox}
              isActive={show}
              disabled={!selectable}
            />
            <span className={styles.name}>{name}</span>
            {!show && !selectable && <span className={styles.soon}>soon</span>}
          </div>
        ))}
      </div>
    </Panel>
  </ContextMenu>
)

export default AssetsToggleColumns
