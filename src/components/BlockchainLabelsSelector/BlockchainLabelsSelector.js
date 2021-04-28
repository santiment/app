import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel'
import Input from '@santiment-network/ui/Input'
import Item from '../../ducks/Watchlists/Widgets/Filter/EntryPoint/Item'
import { getBlockchainLabelReadable, useBlockchainLabels } from './hooks'
import styles from './TransactionLabelsSelector.module.scss'

const LabelItem = ({ label, addItemInState, selected }) => {
  return (
    <Item
      key={label}
      onClick={() => {
        addItemInState(label)
      }}
      isActive={selected}
      name={getBlockchainLabelReadable(label)}
      id={label}
    />
  )
}

const DefaultTrigger = ({ labels, ...rest }) => (
  <div className={styles.trigger} {...rest}>
    Select labels {labels.length > 0 ? `(${labels.length})` : ''}
  </div>
)

const BlockchainLabelsSelector = ({
  onChange,
  value,
  trigger: Trigger = DefaultTrigger
}) => {
  const { data: labels } = useBlockchainLabels()

  const [searchTerm, setSearchTerm] = useState('')

  function onChangeSearch (e) {
    setSearchTerm(e.target.value)
  }

  function addItemInState (label) {
    const found = value.find(l => l === label)
    if (found) {
      onChange(value.filter(l => l !== label))
    } else {
      onChange([...value, label])
    }
  }

  function filterBySearch (list) {
    if (!searchTerm) {
      return list
    }

    const term = searchTerm.toLowerCase()
    return list.filter(
      label =>
        label.indexOf(term) !== -1 ||
        getBlockchainLabelReadable(label).indexOf(term) !== -1
    )
  }

  const selectedLabels = useMemo(
    () => {
      return filterBySearch(value)
    },
    [value, searchTerm]
  )

  const selectableLabels = useMemo(
    () => {
      const cache = new Set(selectedLabels)
      return filterBySearch(labels.filter(s => !cache.has(s)))
    },
    [selectedLabels, labels, searchTerm]
  )

  const countSelected = selectedLabels.length
  const isResetVisible = selectableLabels.length > 0

  return (
    <div className={styles.wrapper}>
      <ContextMenu
        passOpenStateAs='data-isactive'
        position='bottom'
        align='start'
        className={styles.dropdown}
        trigger={
          <div>
            <Trigger labels={value} />
          </div>
        }
      >
        <Panel className={styles.panel}>
          <div className={styles.content}>
            <Input
              type='text'
              onChange={onChangeSearch}
              defaultValue={searchTerm}
              className={styles.search}
              placeholder='Type to search'
            />

            <div className={styles.scroller}>
              {countSelected > 0 && (
                <>
                  <div className={styles.title}>Active labels</div>
                  <div
                    className={cx(
                      styles.list,
                      !isResetVisible && styles.noMargin
                    )}
                  >
                    {selectedLabels.map(l => {
                      return (
                        <LabelItem
                          key={l}
                          label={l}
                          addItemInState={addItemInState}
                          selected={true}
                        />
                      )
                    })}
                  </div>
                </>
              )}

              {selectableLabels.length > 0 && (
                <>
                  <div className={styles.title}>Choose more labels</div>
                  <div className={cx(styles.list, styles.noMargin)}>
                    {selectableLabels.map(l => {
                      return (
                        <LabelItem
                          key={l}
                          label={l}
                          addItemInState={addItemInState}
                          selected={false}
                        />
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {isResetVisible ? (
            <div
              className={styles.reset}
              onClick={() => {
                onChange(labels)
              }}
            >
              Select all
            </div>
          ) : (
            <div
              className={styles.reset}
              onClick={() => {
                onChange([])
              }}
            >
              Deselect all
            </div>
          )}
        </Panel>
      </ContextMenu>
    </div>
  )
}

export default BlockchainLabelsSelector
