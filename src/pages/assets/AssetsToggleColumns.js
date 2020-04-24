import React, { Fragment } from 'react'
import {
  Button,
  Checkbox,
  ContextMenu,
  Icon,
  Panel,
  Tooltip
} from '@santiment-network/ui'
import { COLUMNS_NAMES, MARKET_SEGMENT_COLUMNS } from './asset-columns.js'
import { Description } from '../../ducks/dataHub/metrics/descriptions'
import styles from './AssetsToggleColumns.module.scss'

const HIDDEN_COLUMNS = [
  COLUMNS_NAMES.index,
  COLUMNS_NAMES.project,
  ...MARKET_SEGMENT_COLUMNS
]

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
        {Object.entries(columns).map(([name, { selectable, show, key }]) => (
          <Fragment key={name}>
            {!HIDDEN_COLUMNS.includes(name) && (
              <div
                className={styles.column}
                onClick={() => onChange({ name, show, selectable })}
              >
                <Checkbox
                  className={styles.checkbox}
                  isActive={show}
                  disabled={!selectable}
                />
                <span className={styles.name}>{name}</span>
                {key && Description[key] && (
                  <Tooltip
                    className={styles.tooltip}
                    position='top'
                    trigger={
                      <Icon
                        type='question-round-small'
                        className={styles.description}
                      />
                    }
                  >
                    <Panel padding>{Description[key]}</Panel>
                  </Tooltip>
                )}
                {!show && !selectable && (
                  <span className={styles.soon}>soon</span>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </Panel>
  </ContextMenu>
)

export default AssetsToggleColumns
