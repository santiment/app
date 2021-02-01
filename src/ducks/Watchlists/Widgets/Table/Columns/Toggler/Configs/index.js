import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel'
import Button from '@santiment-network/ui/Button'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { useFeaturedTableConfigs, useUserTableConfigs } from '../../gql/queries'
import { useCreateTableConfig, useDeleteTableConfig } from '../../gql/mutations'
import UpdateConfig from './NewConfig'
import styles from './index.module.scss'

const ConfigsMenu = ({ setOpen, open, changeConfig, config }) => {
  const { id: selectedId, title } = config
  const featuredTableConfigurations = useFeaturedTableConfigs()
  const userTableConfigs = useUserTableConfigs()
  const { createTableConfig } = useCreateTableConfig()
  const { deleteTableConfig } = useDeleteTableConfig()

  function onConfigSelect (id) {
    changeConfig(id)
    setOpen(false)
  }

  function onCreateConfig (settings) {
    return createTableConfig(settings)
  }

  function onDeleteConfig (id) {
    deleteTableConfig(id)
  }

  return (
    <ContextMenu
      trigger={
        <Button
          variant='flat'
          className={cx(styles.trigger, open && styles.isOpened)}
        >
          {title}
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
        <UpdateConfig sets={userTableConfigs} createConfig={onCreateConfig} />
        <div className={styles.content}>
          <h3 className={styles.title}>Popular sets</h3>
          {featuredTableConfigurations.map(({ title, id }) => (
            <Button
              variant='ghost'
              className={cx(
                styles.buttonConfig,
                id === selectedId && styles.buttonConfig__active
              )}
              key={id}
              onClick={() => onConfigSelect(id)}
            >
              {title}
            </Button>
          ))}
          {userTableConfigs.length > 0 && (
            <>
              <h3 className={styles.title}>Personal sets</h3>
              {userTableConfigs.map(({ title, id }) => (
                <Button
                  variant='ghost'
                  className={cx(
                    styles.buttonConfig,
                    id === selectedId && styles.buttonConfig__active
                  )}
                  key={id}
                  onClick={() => onConfigSelect(id)}
                >
                  {title}
                  <div
                    className={styles.actions}
                    onClick={evt => evt.stopPropagation()}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='13'
                      height='13'
                    >
                      <path
                        fillRule='evenodd'
                        d='M.5 0C.2 0 0 .2 0 .5v11c0 .3.2.5.5.5h11c.3 0 .5-.2.5-.5V3.6l-.1-.3-3-3.1-.4-.2h-8zM1 11V1h1.5v4c0 .3.2.5.5.5h4c.3 0 .5-.2.5-.5V1h.8L11 3.8V11H1zM6.5 1h-3v3.5h3V1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <Icon type='edit-small' />
                    <Icon
                      type='remove-small'
                      onClick={() => onDeleteConfig({ id, title })}
                    />
                  </div>
                </Button>
              ))}
            </>
          )}
        </div>
      </Panel>
    </ContextMenu>
  )
}

export default ConfigsMenu
