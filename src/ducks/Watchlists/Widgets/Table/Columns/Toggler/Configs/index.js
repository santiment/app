import React, { useMemo, useEffect } from 'react'
import cx from 'classnames'
import isEqual from 'lodash.isequal'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel'
import Button from '@santiment-network/ui/Button'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { useFeaturedTableConfigs, useUserTableConfigs } from '../../gql/queries'
import {
  useCreateTableConfig,
  useDeleteTableConfig,
  useUpdateTableConfig,
} from '../../gql/mutations'
import UpdateConfig from './UpdateConfig'
import { DEFAULT_ORDER_BY } from '../../defaults'
import { BLOCKCHAIN_ADDRESS } from '../../../../../detector'
import styles from './index.module.scss'

const EMPTY_ARRAY = []

const ConfigsMenu = ({
  type,
  setOpen,
  open,
  changeConfig,
  config,
  sorting,
  savedActiveColumnKeys = EMPTY_ARRAY,
  isLoading,
}) => {
  const featuredTableConfigurations = useFeaturedTableConfigs(type)
  const userTableConfigs = useUserTableConfigs(type)

  const { createTableConfig } = useCreateTableConfig()
  const { deleteTableConfig } = useDeleteTableConfig()
  const { updateTableConfig } = useUpdateTableConfig()

  useEffect(() => {
    if (!config && featuredTableConfigurations.length !== 0) {
      const idx = featuredTableConfigurations.length - 1
      changeConfig(featuredTableConfigurations[idx].id)
    }
  }, [featuredTableConfigurations])

  const hasUnsavedChanges = useMemo(() => {
    const comparedSorting =
      config && config.columns.sorting ? config.columns.sorting : DEFAULT_ORDER_BY
    const isUnsavedSorting = type !== BLOCKCHAIN_ADDRESS && !isEqual(sorting, comparedSorting)

    return (
      savedActiveColumnKeys &&
      config &&
      !isLoading &&
      (!isEqual(config.columns.metrics, savedActiveColumnKeys) || isUnsavedSorting)
    )
  }, [savedActiveColumnKeys, sorting, config])

  const transformedTrigger = useMemo(
    () => config && hasUnsavedChanges && !userTableConfigs.some(({ id }) => id === config.id),
    [hasUnsavedChanges, userTableConfigs, config],
  )

  function onConfigSelect (id) {
    changeConfig(id)
    setOpen(false)
  }

  if (!config) {
    return null
  }

  const { id: selectedId, title } = config

  return (
    <ContextMenu
      trigger={
        <Button variant='flat' className={cx(styles.trigger, open && styles.isOpened)}>
          <span className={cx(hasUnsavedChanges && styles.circle)}>
            {transformedTrigger ? 'Save as set' : title}
          </span>
          <Icon type='arrow-down' className={styles.arrow} />
        </Button>
      }
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.wrapper}>
        <UpdateConfig
          sets={userTableConfigs}
          onChange={(title) =>
            createTableConfig({
              title,
              type,
              columns: { metrics: savedActiveColumnKeys, sorting },
            }).then(({ id }) => {
              changeConfig(id)
              setOpen(false)
            })
          }
        />
        <div className={styles.content}>
          <h3 className={styles.title}>Popular sets</h3>
          {featuredTableConfigurations.map(({ title, id }) => (
            <Button
              variant='ghost'
              className={cx(styles.buttonConfig, id === selectedId && styles.buttonConfig__active)}
              key={id}
              onClick={() => (id !== selectedId ? onConfigSelect(id) : setOpen(false))}
            >
              {title}
            </Button>
          ))}
          {userTableConfigs.length > 0 && (
            <>
              <h3 className={styles.title}>Personal sets</h3>
              {userTableConfigs.map((config) => {
                const { id, title } = config
                return (
                  <Button
                    variant='ghost'
                    className={cx(
                      styles.buttonConfig,
                      id === selectedId && styles.buttonConfig__active,
                    )}
                    key={id}
                    onClick={() => onConfigSelect(id)}
                  >
                    {title}
                    {hasUnsavedChanges && <span className={styles.tooltip}>Unsaved set</span>}
                    <div className={styles.actions} onClick={(evt) => evt.stopPropagation()}>
                      <Icon
                        type='disk-small'
                        onClick={() =>
                          updateTableConfig(config, {
                            columns: { metrics: savedActiveColumnKeys, sorting },
                          })
                        }
                      />
                      <UpdateConfig
                        sets={userTableConfigs}
                        onChange={(title) => updateTableConfig(config, { title })}
                        title='Rename'
                        name={title}
                        buttonLabel='Save'
                        trigger={<Icon type='edit-small' />}
                      />
                      <Icon type='remove-small' onClick={() => deleteTableConfig({ id, title })} />
                    </div>
                  </Button>
                )
              })}
            </>
          )}
        </div>
      </Panel>
    </ContextMenu>
  )
}

export default ConfigsMenu
