import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel'
import Input from '@santiment-network/ui/Input'
import Item from '../../ducks/Watchlists/Widgets/Filter/EntryPoint/Item'
import { useProject } from '../../hooks/project'
import { toggleByKey } from '../../pages/Index/Section/KeystackeholdersEvents/StakeholderLabels/StakeholderLabels'
import styles from './AssetsSelector.module.scss'

const ProjectItem = ({
  project: targetProject,
  slug,
  addItemInState,
  selected
}) => {
  const [project = targetProject] = useProject(!targetProject && slug)
  const { ticker, slug: targetSlug = slug, name = slug } = project || {}

  return (
    <Item
      key={targetSlug}
      onClick={() => {
        addItemInState(targetSlug)
      }}
      isActive={selected}
      name={name}
      ticker={ticker}
      id={targetSlug}
    />
  )
}

const AssetsSelector = ({ onChange, selected, projects, slugs, className }) => {
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
    return list.filter(slug => slug.indexOf(term) !== -1)
  }

  const selectedAssets = useMemo(
    () => {
      return filterBySearch(Object.keys(selected))
    },
    [selected, searchTerm]
  )

  const selectableAssets = useMemo(
    () => {
      const cache = new Set(selectedAssets)
      return filterBySearch(slugs.filter(s => !cache.has(s)))
    },
    [selectedAssets, slugs, searchTerm]
  )

  const countSelected = selectedAssets.length
  const isResetVisible = selectableAssets.length > 0

  return (
    <div className={styles.wrapper}>
      <ContextMenu
        passOpenStateAs='data-isactive'
        position='bottom'
        align='end'
        className={styles.dropdown}
        trigger={
          <div className={cx(styles.trigger, className)}>
            All assets
            {countSelected > 0 ? `: ${countSelected}` : ''}
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
              placeholder='Search for asset'
            />

            <div className={styles.scroller}>
              {countSelected > 0 && (
                <>
                  <div className={styles.title}>Selected assets</div>
                  <div
                    className={cx(
                      styles.list,
                      !isResetVisible && styles.noMargin
                    )}
                  >
                    {selectedAssets.map(slug => {
                      return (
                        <ProjectItem
                          key={slug}
                          slug={slug}
                          project={projects[slug]}
                          addItemInState={addItemInState}
                          selected={true}
                        />
                      )
                    })}
                  </div>
                </>
              )}

              {selectableAssets.length > 0 && (
                <>
                  <div className={styles.title}>Assets</div>
                  <div className={cx(styles.list, styles.noMargin)}>
                    {selectableAssets.map(slug => {
                      return (
                        <ProjectItem
                          key={slug}
                          slug={slug}
                          project={projects[slug]}
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
                  slugs.reduce((acc, s) => {
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

export default AssetsSelector
