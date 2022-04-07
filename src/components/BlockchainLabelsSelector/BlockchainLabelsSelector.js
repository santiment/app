import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel'
import { InputWithIcon } from '@santiment-network/ui/Input'
import Item from '../../ducks/Watchlists/Widgets/Filter/EntryPoint/Item'
import { getBlockchainLabelReadable, useBlockchainLabels } from './hooks'
import Skeleton from '../Skeleton/Skeleton'
import styles from './BlockchainLabelsSelector.module.scss'

const LabelItem = ({ label, addItemInState, selected }) => {
  return (
    <Item
      key={label}
      className={styles.item}
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

const BlockchainLabelsSelector = ({ onChange, value, trigger: Trigger = DefaultTrigger }) => {
  const { data: labels, loading } = useBlockchainLabels()

  const [searchTerm, setSearchTerm] = useState('')

  function onChangeSearch (e) {
    setSearchTerm(e.target.value)
  }

  function addItemInState (label) {
    const found = value.find((l) => l === label)
    if (found) {
      onChange(value.filter((l) => l !== label))
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
      (label) =>
        label.indexOf(term) !== -1 || getBlockchainLabelReadable(label).indexOf(term) !== -1,
    )
  }

  const selectedLabels = useMemo(() => {
    return filterBySearch(value)
  }, [value, searchTerm])

  const selectableLabels = useMemo(() => {
    const cache = new Set(selectedLabels)
    return filterBySearch(labels.filter((s) => !cache.has(s)))
  }, [selectedLabels, labels, searchTerm])

  const countSelected = selectedLabels.length

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
            <InputWithIcon
              type='text'
              icon='search-small'
              iconPosition='left'
              onChange={onChangeSearch}
              defaultValue={searchTerm}
              className={styles.search}
              placeholder='Type to search'
            />

            <Skeleton repeat={1} className={styles.skeleton} show={loading} />

            <div className={styles.scroller}>
              {countSelected > 0 && (
                <>
                  <div className={styles.title}>Active labels</div>
                  <div className={cx(styles.list, styles.noMargin)}>
                    {selectedLabels.map((l) => {
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
                    {selectableLabels.map((l) => {
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
        </Panel>
      </ContextMenu>
    </div>
  )
}

export default BlockchainLabelsSelector
