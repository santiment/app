import React, { useState, useEffect, useMemo, Fragment } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel'
import Button from '@santiment-network/ui/Button'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { InputWithIcon as Input } from '@santiment-network/ui/Input'
import MetricState from '../MetricState'
import Suggestions from '../Suggestions'
import Combinators from '../Combinators'
import { useMetricSettings } from '../hooks'
import { useAvailableSegments } from './hooks'
import { filterValuesBySearch } from '../utils'
import { extractFilterByMetricType } from '../../detector'
import Skeleton from '../../../../../../components/Skeleton/Skeleton'
import styles from './index.module.scss'

const DEFAULT_SETTINGS = {
  market_segments: [],
  market_segments_combinator: 'and',
  isActive: false,
}

const MarketSegments = ({
  isViewMode,
  baseMetric,
  defaultSettings,
  isNoFilters,
  updMetricInFilter,
  toggleMetricInFilter,
}) => {
  const [segments, loading] = useAvailableSegments()
  const { settings, setSettings, selectSuggest, clickCheckbox } = useMetricSettings(defaultSettings)
  const [search, setSearch] = useState('')

  const hasActiveSegments = settings.market_segments.length > 0
  const isANDCombinator = settings.market_segments_combinator === 'and'
  const filteredSegments = useMemo(() => filterValuesBySearch(search, segments, 'name'), [
    search,
    segments,
  ])

  useEffect(() => {
    if (isNoFilters) {
      setSettings(DEFAULT_SETTINGS)
    }
  }, [isNoFilters])

  useEffect(() => {
    if (settings !== defaultSettings) {
      const { market_segments, market_segments_combinator, isActive } = settings
      const { isActive: previousIsActive } = defaultSettings

      const newFilter = {
        args: { market_segments_combinator, market_segments },
        name: 'market_segments',
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
  }, [settings])

  function onToggleMode (combinator) {
    setSettings((state) => ({ ...state, market_segments_combinator: combinator }))
  }

  function onToggleSegment (segment) {
    const selectedSegmentsSet = new Set(settings.market_segments)

    if (!selectedSegmentsSet.delete(segment)) {
      selectedSegmentsSet.add(segment)
    }

    setSettings((state) => ({
      ...state,
      market_segments: [...selectedSegmentsSet],
    }))
  }

  return (
    <>
      <MetricState
        isViewMode={isViewMode}
        metric={baseMetric}
        settings={settings}
        isActive={settings.isActive}
        onCheckboxClicked={clickCheckbox}
        customStateText={
          settings.isActive && hasActiveSegments
            ? `shows ${isANDCombinator ? 'all' : 'at least one'} of selected groups`
            : ''
        }
      />
      {settings.isActive && hasActiveSegments > 0 && (
        <div className={styles.labels}>
          {settings.market_segments.map((name, idx) => (
            <Fragment key={idx}>
              <div
                className={cx(styles.label, isViewMode && styles.label__viewMode)}
                onClick={() => onToggleSegment(name)}
              >
                {name}
                {!isViewMode && <Icon type='close-small' className={styles.label__close} />}
              </div>
              {settings.market_segments.length !== idx + 1 && (
                <span className={styles.operator}>{isANDCombinator ? 'and' : 'or'}</span>
              )}
            </Fragment>
          ))}
        </div>
      )}
      {settings.isActive && !isViewMode && (
        <div className={styles.wrapper}>
          <div className={styles.settings}>
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
                  placeholder='Choose market segments'
                  onChange={(evt) => {
                    const { value } = evt.currentTarget
                    setSearch(value)
                  }}
                />
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
                        <div className={cx(styles.action, styles.delete)}>Remove</div>
                      </Button>
                    ))}
                  </div>
                )}
                <div className={styles.list}>
                  <Skeleton repeat={3} show={loading} className={styles.loader} />
                  {filteredSegments.map(({ name, count }, idx) => {
                    const isSelected = settings.market_segments.includes(name)

                    return (
                      <Button
                        className={cx(styles.item, isSelected && styles.item__selected)}
                        fluid
                        variant='ghost'
                        key={idx}
                        onClick={() => !isSelected && onToggleSegment(name)}
                      >
                        <div>
                          <span className={styles.name}>{name}</span>
                          <span className={styles.count}>({count})</span>
                        </div>
                        <div className={cx(styles.action, isSelected && styles.selected)}>Add</div>
                      </Button>
                    )
                  })}
                </div>
              </Panel>
            </ContextMenu>
            <Combinators onSelect={onToggleMode} isANDCombinator={isANDCombinator} />
          </div>
          <Suggestions hints={baseMetric.hints} onSuggestionClick={selectSuggest} />
        </div>
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
        ...settings,
      }}
    />
  )
}
