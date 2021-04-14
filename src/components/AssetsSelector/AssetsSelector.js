import React, { useMemo } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel'
import Item from '../../ducks/Watchlists/Widgets/Filter/EntryPoint/Item'
import { useProject } from '../../hooks/project'
import { toggleByKey } from '../../pages/Index/Section/KeystackeholdersEvents/StakeholderLabels/StakeholderLabels'
import styles from './AssetsSelector.module.scss'

const ProjectItem = ({ slug, addItemInState, selected }) => {
  const [project = {}] = useProject(slug)

  const { ticker, slug: target = slug, name = slug } = project

  return (
    <Item
      key={target}
      onClick={() => {
        addItemInState(target)
      }}
      isActive={selected}
      name={name}
      ticker={ticker}
      id={slug}
    />
  )
}

const AssetsSelector = ({ onChange, selected, slugs, className }) => {
  function addItemInState (slug) {
    toggleByKey(slug, selected, onChange)
  }

  const selectedAssets = useMemo(
    () => {
      return Object.keys(selected)
    },
    [selected]
  )

  const selectableAssets = useMemo(
    () => {
      const cache = new Set(selectedAssets)
      return slugs.filter(s => !cache.has(s))
    },
    [selectedAssets, slugs]
  )

  const countSelected = selectedAssets.length
  const isResetVisible = selectableAssets.length > 0

  return (
    <div className={styles.wrapper}>
      <ContextMenu
        passOpenStateAs='data-isactive'
        position='bottom'
        align='start'
        className={styles.dropdown}
        trigger={
          <div className={className}>
            All assets
            {countSelected > 0 ? `: ${countSelected}` : ''}
          </div>
        }
      >
        <Panel className={styles.panel}>
          <div className={styles.content}>
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
                          addItemInState={addItemInState}
                          selected={false}
                        />
                      )
                    })}
                  </div>
                </>
              )}

              {isResetVisible && (
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
              )}
            </div>
          </div>
        </Panel>
      </ContextMenu>
    </div>
  )
}

export default AssetsSelector
