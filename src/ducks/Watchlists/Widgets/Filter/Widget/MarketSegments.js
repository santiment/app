import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import Icon from '@santiment-network/ui/Icon'
import Skeleton from '../../../../../components/Skeleton/Skeleton'
import ExplanationTooltip from '../../../../../components/ExplanationTooltip/ExplanationTooltip'
import MetricState from '../Metric/MetricState'
import { useAvailableSegments } from '../../../gql/hooks'
import { DEFAULT_SETTINGS } from '../defaults'
import styles from './MarketSegments.module.scss'

const MarketSegments = ({ isViewMode, baseMetric, defaultSettings }) => {
  const [segments = [], loading] = useAvailableSegments()
  const [settings, setSettings] = useState(defaultSettings)

  const hasActiveSegments = settings.segments.length > 0

  function onCheckboxClicked () {
    setSettings(state => ({ ...state, isActive: !settings.isActive }))
  }

  function onToggleMode () {
    setSettings(state => ({
      ...state,
      combinator: settings.combinator === 'and' ? 'or' : 'and'
    }))
  }

  function onToggleSegment (segment) {
    const selectedSegmentsSet = new Set(settings.segments)

    if (!selectedSegmentsSet.delete(segment)) {
      selectedSegmentsSet.add(segment)
    }

    setSettings(state => ({ ...state, segments: [...selectedSegmentsSet] }))
  }

  return (
    <>
      <MetricState
        isViewMode={isViewMode}
        metric={baseMetric}
        settings={settings}
        isActive={settings.isActive}
        onCheckboxClicked={onCheckboxClicked}
        customStateText={
          settings.isActive && hasActiveSegments
            ? `shows ${
              settings.combinator === 'and' ? 'all' : 'at least one'
            } of`
            : ''
        }
      />
      {hasActiveSegments > 0 && (
        <div className={styles.labels}>
          {settings.segments.map((item, idx) => (
            <span key={idx} className={styles.label}>
              {item}
            </span>
          ))}
        </div>
      )}
      {settings.isActive && !isViewMode && (
        <div className={styles.settings}>
          <ContextMenu
            passOpenStateAs='isActive'
            position='bottom'
            align='start'
            className={styles.dropdown}
            trigger={
              <Button border classes={styles} className={styles.trigger__btn}>
                Choose market segments
                <Icon type='arrow-down' className={styles.trigger__arrow} />
              </Button>
            }
          >
            <Panel className={styles.panel}>
              {hasActiveSegments > 0 && (
                <div className={styles.list}>
                  {settings.segments.map((name, idx) => (
                    <Button
                      className={styles.item}
                      fluid
                      variant='ghost'
                      key={idx}
                      onClick={() => onToggleSegment(name)}
                    >
                      <div>
                        <span className={styles.name}>{name}</span>
                      </div>
                      <div className={cx(styles.action, styles.delete)}>
                        Remove
                      </div>
                    </Button>
                  ))}
                </div>
              )}
              <div className={styles.list}>
                <Skeleton repeat={3} show={loading} className={styles.loader} />
                {segments.map(({ name, count }, idx) => {
                  const isSelected = settings.segments.includes(name)

                  return (
                    <Button
                      className={cx(
                        styles.item,
                        isSelected && styles.item__selected
                      )}
                      fluid
                      variant='ghost'
                      key={idx}
                      onClick={() => (isSelected ? {} : onToggleSegment(name))}
                    >
                      <div>
                        <span className={styles.name}>{name}</span>
                        <span className={styles.count}>({count})</span>
                      </div>
                      <div
                        className={cx(
                          styles.action,
                          isSelected && styles.selected
                        )}
                      >
                        Add
                      </div>
                    </Button>
                  )
                })}
              </div>
            </Panel>
          </ContextMenu>
          <ExplanationTooltip
            text={
              settings.combinator === 'and'
                ? 'Show assets that matches all of selected segments'
                : 'Show assets that matches at least one of selected segments'
            }
            className={styles.explanation}
            align='end'
            offsetY={10}
          >
            <Button
              className={styles.toggleModeBtn}
              fluid
              variant='flat'
              isActive
              onClick={onToggleMode}
            >
              {settings.combinator === 'and' ? 'All' : 'Any'}
            </Button>
          </ExplanationTooltip>
        </div>
      )}
    </>
  )
}

export default ({ filters, baseMetric, ...props }) => {
  return (
    <MarketSegments
      {...props}
      baseMetric={baseMetric}
      defaultSettings={{
        ...DEFAULT_SETTINGS,
        segments: []
      }}
    />
  )
}
