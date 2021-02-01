import React, { useState } from 'react'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel'
import Button from '@santiment-network/ui/Button'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { useFeaturedTableConfigs, useUserTableConfigs } from '../../gql/queries'
import styles from './index.module.scss'

const ConfigsMenu = ({ setOpen, open }) => {
  const featuredTableConfigurations = useFeaturedTableConfigs()
  const userTableConfigs = useUserTableConfigs()

  function onConfigSelect (id) {
    setOpen(false)
  }
  return (
    <ContextMenu
      trigger={
        <Button variant='flat' className={styles.button}>
          <Icon type='arrow-down' />
        </Button>
      }
      open={open}
      passOpenStateAs='isActive'
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.wrapper}>
        <Button variant='flat' border className={styles.saveAs}>
          Save columns as ...
        </Button>
        <div className={styles.content}>
          <h3 className={styles.title}>Popular sets</h3>
          {featuredTableConfigurations.map(({ title, id }) => (
            <Button
              variant='ghost'
              className={styles.buttonConfig}
              key={id}
              onClick={() => onConfigSelect(id)}
            >
              {title}
            </Button>
          ))}
          <h3 className={styles.title}>Personal sets</h3>
          {userTableConfigs.map(({ title, id }) => (
            <Button variant='ghost' className={styles.buttonConfig} key={id}>
              {title}
            </Button>
          ))}
        </div>
      </Panel>
    </ContextMenu>
  )
}

export default ConfigsMenu
