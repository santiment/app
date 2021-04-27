import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel'
import Input from '@santiment-network/ui/Input'
import Item from '../../ducks/Watchlists/Widgets/Filter/EntryPoint/Item'
import { useProject } from '../../hooks/project'
import { toggleByKey } from '../../pages/Index/Section/KeystackeholdersEvents/StakeholderLabels/StakeholderLabels'
import styles from './TransactionLabelsSelector.module.scss'
import { getBlockchainLabelReadable, useBlockchainLabels } from './hooks'

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

const TransactionLabelsSelector = ({ onChange, selected, className }) => {
  const { data: labels } = useBlockchainLabels()

  const [searchTerm, setSearchTerm] = useState('')

  function onChangeSearch (e) {
    setSearchTerm(e.target.value)
  }

  function addItemInState (slug) {
    toggleByKey(slug, selected, onChange)
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
      return filterBySearch(Object.keys(selected))
    },
    [selected, searchTerm]
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
          <div className={cx(styles.trigger, className)}>Select labels</div>
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
                onChange(
                  labels.reduce((acc, s) => {
                    acc[s] = true

                    return acc
                  }, {})
                )
              }}
            >
              Select all
            </div>
          ) : (
            <div
              className={styles.reset}
              onClick={() => {
                onChange({})
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

export default TransactionLabelsSelector
