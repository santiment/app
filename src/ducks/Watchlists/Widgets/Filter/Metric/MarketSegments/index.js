import React, { useState, useEffect, Fragment } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import Icon from '@santiment-network/ui/Icon'
import Skeleton from '../../../../../../components/Skeleton/Skeleton'
import ExplanationTooltip from '../../../../../../components/ExplanationTooltip/ExplanationTooltip'
import MetricState from '../MetricState'
import { useAvailableSegments } from '../../../../gql/hooks'
import { extractFilterByMetricType } from '../../detector'
import Suggestions from '../Suggestions'
import styles from './index.module.scss'

const DEFAULT_SETTINGS = {
  market_segments: [],
  market_segments_combinator: 'and',
  isActive: false
}

const MarketSegments = ({
  isViewMode,
  baseMetric,
  defaultSettings,
  isNoFilters,
  updMetricInFilter,
  toggleMetricInFilter
}) => {
  const [segments = [], loading] = useAvailableSegments()
  const [settings, setSettings] = useState(defaultSettings)

  const hasActiveSegments = settings.market_segments.length > 0
  const isANDCombinator = settings.market_segments_combinator === 'and'

  useEffect(
    () => {
      if (isNoFilters) {
        setSettings(DEFAULT_SETTINGS)
      }
    },
    [isNoFilters]
  )

  useEffect(
    () => {
      if (settings !== defaultSettings) {
        const {
          market_segments,
          market_segments_combinator,
          isActive
        } = settings
        const { isActive: previousIsActive } = defaultSettings

        const newFilter = {
          args: { market_segments_combinator, market_segments },
          name: 'market_segments'
        }

        if (hasActiveSegments) {
          if (previousIsActive !== isActive) {
            toggleMetricInFilter(newFilter, baseMetric.key)
          } else {
            updMetricInFilter(newFilter, baseMetric.key)
          }
        }

        if (!hasActiveSegments && isActive && defaultSettings.isActive) {
          toggleMetricInFilter(newFilter, baseMetric.key)
        }
      }
    },
    [settings]
  )

  function onCheckboxClicked () {
    setSettings(state => ({ ...state, isActive: !settings.isActive }))
  }

  function onToggleMode () {
    setSettings(state => ({
      ...state,
      market_segments_combinator: isANDCombinator ? 'or' : 'and'
    }))
  }

  function onToggleSegment (segment) {
    const selectedSegmentsSet = new Set(settings.market_segments)

    if (!selectedSegmentsSet.delete(segment)) {
      selectedSegmentsSet.add(segment)
    }

    setSettings(state => ({
      ...state,
      market_segments: [...selectedSegmentsSet]
    }))
  }

  function onSuggestionClick (props) {
    setSettings(state => ({ ...state, ...props }))
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
              isANDCombinator ? 'all' : 'at least one'
            } of selected groups`
            : ''
        }
      />
      {settings.isActive && hasActiveSegments > 0 && (
        <div className={styles.labels}>
          {settings.market_segments.map((name, idx) => (
            <Fragment key={idx}>
              <div
                className={cx(
                  styles.label,
                  isViewMode && styles.label__viewMode
                )}
                onClick={() => onToggleSegment(name)}
              >
                {name}
                {!isViewMode && (
                  <Icon type='close-small' className={styles.label__close} />
                )}
              </div>
              {settings.market_segments.length !== idx + 1 && (
                <span className={styles.operator}>
                  {isANDCombinator ? 'and' : 'or'}
                </span>
              )}
            </Fragment>
          ))}
        </div>
      )}
      {settings.isActive && !isViewMode && (
        <>
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
                    {settings.market_segments.map((name, idx) => (
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
                  <Skeleton
                    repeat={3}
                    show={loading}
                    className={styles.loader}
                  />
                  {segments.map(({ name, count }, idx) => {
                    const isSelected = settings.market_segments.includes(name)

                    return (
                      <Button
                        className={cx(
                          styles.item,
                          isSelected && styles.item__selected
                        )}
                        fluid
                        variant='ghost'
                        key={idx}
                        onClick={() =>
                          isSelected ? {} : onToggleSegment(name)
                        }
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
                isANDCombinator
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
                {isANDCombinator ? 'All' : 'Any'}
              </Button>
            </ExplanationTooltip>
          </div>
          <Suggestions
            hints={baseMetric.hints}
            onSuggestionClick={onSuggestionClick}
          />
        </>
      )}
    </>
  )
}

export default ({ filters, baseMetric, ...props }) => {
  const filter = extractFilterByMetricType(filters, baseMetric)
  const settings = filter.length === 0 ? {} : { ...filter[0], isActive: true }

  return (
    <MarketSegments
      {...props}
      baseMetric={baseMetric}
      defaultSettings={{
        ...DEFAULT_SETTINGS,
        ...settings
      }}
    />
  )
}
