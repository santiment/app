import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import styles from './DialogLoadTemplate.module.scss'

const Template = () => {
  const [isPublic, setIsPublic] = useState()

  function toggleIsPublic () {
    setIsPublic(state => !state)
  }

  return (
    <div className={styles.template}>
      <div className={styles.left}>
        <div className={styles.title}>Main financial metrics</div>
        <div className={styles.info}>Ethereum | 3 metrics</div>
      </div>
      <div
        className={cx(styles.publicity, isPublic && styles.publicity_public)}
        onClick={toggleIsPublic}
      >
        <Icon type={isPublic ? 'eye' : 'lock-small'} className={styles.icon} />
      </div>

      <ContextMenu
        trigger={
          <Button variant='flat' className={cx(styles.menu)}>
            <Icon type='dots' />
          </Button>
        }
        passOpenStateAs='isActive'
        position='bottom'
        align='end'
      >
        <Panel variant='modal' className={styles.options}>
          <Button
            fluid
            variant='ghost'
            onClick={toggleIsPublic}
            className={styles.context__btn}
          >
            Public
            <Toggle isActive={isPublic} className={styles.toggle} />
          </Button>
        </Panel>
      </ContextMenu>
    </div>
  )
}

export default ({
  placeholder,
  buttonLabel,
  defaultValue,
  onFormSubmit,
  ...props
}) => {
  function onSubmit (e) {
    e.preventDefault()
    onFormSubmit(e.currentTarget.templateName.value)
  }

  return (
    <Dialog title='Load Template' {...props}>
      <Dialog.ScrollContent className={styles.wrapper}>
        <Template />
        <Template />
        <Template />
        <Template />
      </Dialog.ScrollContent>
    </Dialog>
  )
}
