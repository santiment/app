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
import { useMarketExchanges } from './hooks'
import { filterValuesBySearch } from '../utils'
import { extractFilterByMetricType } from '../../detector'
import Skeleton from '../../../../../../components/Skeleton/Skeleton'
import styles from './index.module.scss'

const DEFAULT_SETTINGS = {
  exchanges: [],
  exchanges_combinator: 'or',
  isActive: false,
}

const Exchanges = ({
  isViewMode,
  baseMetric,
  defaultSettings,
  isNoFilters,
  updMetricInFilter,
  toggleMetricInFilter,
}) => {
  const [exchanges, loading] = useMarketExchanges()
  const { settings, setSettings, selectSuggest, clickCheckbox } = useMetricSettings(defaultSettings)
  const [search, setSearch] = useState('')

  const hasActiveExchanges = settings.exchanges.length > 0
  const isANDCombinator = settings.exchanges_combinator === 'and'
<<<<<<< HEAD
  const filteredExchanges = useMemo(() => filterValuesBySearch(search, exchanges, 'exchange'), [
    search,
    exchanges,
  ])
=======
  const filteredExchanges = useMemo(
    () => filterValuesBySearch(search, exchanges, 'exchange'),
    [search, exchanges],
  )
>>>>>>> master

  useEffect(() => {
    if (isNoFilters) {
      setSettings(DEFAULT_SETTINGS)
    }
  }, [isNoFilters])

  useEffect(() => {
    if (settings !== defaultSettings) {
      const { exchanges, exchanges_combinator, isActive } = settings
      const { isActive: previousIsActive } = defaultSettings

      const newFilter = {
        args: { exchanges_combinator, exchanges },
        name: 'traded_on_exchanges',
      }

      if (hasActiveExchanges) {
        if (previousIsActive !== isActive) {
          toggleMetricInFilter(newFilter, baseMetric.key)
        } else {
          updMetricInFilter(newFilter, baseMetric.key)
        }
      }

      if (!hasActiveExchanges && isActive && defaultSettings.isActive) {
        toggleMetricInFilter(newFilter, baseMetric.key)
      }
    }
  }, [settings])

<<<<<<< HEAD
  function onToggleMode (combinator) {
=======
  function onToggleMode(combinator) {
>>>>>>> master
    setSettings((state) => ({
      ...state,
      exchanges_combinator: combinator,
    }))
  }

  function onToggleExchange(exchange) {
    const selectedExchangesSet = new Set(settings.exchanges)

    if (!selectedExchangesSet.delete(exchange)) {
      selectedExchangesSet.add(exchange)
    }

    setSettings((state) => ({
      ...state,
      exchanges: [...selectedExchangesSet],
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
          settings.isActive && hasActiveExchanges
            ? `shows ${isANDCombinator ? 'all' : 'at least one'} of selected exchanges`
            : ''
        }
      />
      {settings.isActive && hasActiveExchanges > 0 && (
        <div className={styles.labels}>
          {settings.exchanges.map((name, idx) => (
            <Fragment key={idx}>
              <div
                className={cx(styles.label, isViewMode && styles.label__viewMode)}
                onClick={() => onToggleExchange(name)}
              >
                {name}
                {!isViewMode && <Icon type='close-small' className={styles.label__close} />}
              </div>
              {settings.exchanges.length !== idx + 1 && (
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
                  placeholder='Choose exchanges'
                  onChange={(evt) => {
                    const { value } = evt.currentTarget
                    setSearch(value)
                  }}
                />
              }
            >
              <Panel className={styles.panel}>
                {hasActiveExchanges > 0 && (
                  <div className={styles.list}>
                    {settings.exchanges.map((name, idx) => (
                      <Button
                        className={styles.item}
                        fluid
                        variant='ghost'
                        key={idx}
                        onClick={() => onToggleExchange(name)}
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
                  {filteredExchanges.map(({ exchange, assetsCount, pairsCount }, idx) => {
                    const isSelected = settings.exchanges.includes(exchange)

                    return (
                      <Button
                        className={cx(styles.item, isSelected && styles.item__selected)}
                        fluid
                        variant='ghost'
                        key={idx}
                        onClick={() => !isSelected && onToggleExchange(exchange)}
                      >
                        <div>
                          <span className={styles.name}>{exchange}</span>
                          <span className={styles.count}>
                            ({assetsCount} assets, {pairsCount} pairs)
                          </span>
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
    <Exchanges
      {...props}
      baseMetric={baseMetric}
      defaultSettings={{
        ...DEFAULT_SETTINGS,
        ...settings,
      }}
    />
  )
}
