import React, { Fragment } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Tooltip from '@santiment-network/ui/Tooltip'
import Panel from '@santiment-network/ui/Panel'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Icon from '@santiment-network/ui/Icon'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { COLUMNS_NAMES, MARKET_SEGMENT_COLUMNS } from './columns.js'
import { Description } from '../../../dataHub/metrics/descriptions'
import MetricDescription from '../../../SANCharts/MetricDescription/MetricDescription'
import { Metric } from '../../../dataHub/metrics'
import styles from './AssetsToggleColumns.module.scss'

const HIDDEN_COLUMNS = [
  COLUMNS_NAMES.index,
  COLUMNS_NAMES.project,
  ...MARKET_SEGMENT_COLUMNS
]

const AssetsToggleColumns = ({ columns = [], onChange, isScreener }) => (
  <ContextMenu
    trigger={
      <Button
        fluid
        variant='flat'
        className={cx(styles.button, isScreener && styles.button__withLine)}
      >
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
                    <Panel padding>
                      <MetricDescription metric={Metric[key]} />
                    </Panel>
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
