import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import DialogLoadTemplate from './DialogLoadTemplate'
import { parseTemplateMetrics } from './utils'
import { useUserTemplates } from './gql/hooks'
import FormDialogNewTemplate from './FormDialog/NewTemplate'
import FormDialogRenameTemplate from './FormDialog/RenameTemplate'
import FormDialogDuplicateTemplate from './FormDialog/DuplicateTemplate'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import styles from './index.module.scss'

const Action = props => (
  <Button {...props} fluid variant='ghost' className={styles.action} />
)

const Template = ({
  className,
  currentUser,
  setMetrics,
  setComparables,
  onProjectSelect,
  ...props
}) => {
  const [templates] = useUserTemplates(currentUser.id)
  const [selectedTemplate, setSelectedTemplate] = useState()
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const hasTemplates = templates.length > 0

  useEffect(
    () => {
      if (selectedTemplate) {
        const { project, metrics: templateMetrics } = selectedTemplate
        const { metrics, comparables } = parseTemplateMetrics(templateMetrics)

        onProjectSelect(project)

        if (metrics.length) {
          setMetrics(metrics)
        }
        if (comparables.length) {
          setComparables(comparables)
        }
      }
    },
    [selectedTemplate]
  )

  function openMenu () {
    setIsMenuOpened(true)
  }

  function closeMenu () {
    setIsMenuOpened(false)
  }

  function selectTemplate (template) {
    setSelectedTemplate(template)
    closeMenu()
  }

  function rerenderTemplate () {
    selectTemplate(selectedTemplate)
  }

  function onNewTemplate (template) {
    selectTemplate(template)
    closeMenu()
  }

  return (
    <ContextMenu
      open={isMenuOpened}
      onClose={closeMenu}
      position='bottom'
      align='start'
      trigger={
        <button className={cx(styles.btn, className)}>
          <FormDialogNewTemplate
            {...props}
            onNew={onNewTemplate}
            trigger={
              <div
                className={cx(
                  styles.btn__left,
                  !hasTemplates && styles.btn__left_large
                )}
              >
                <Icon type='cloud-small' className={styles.cloud} />
                {selectedTemplate ? selectedTemplate.title : 'New Template'}
              </div>
            }
          />
          {hasTemplates && (
            <div className={styles.dropdown} onClick={openMenu}>
              <Icon
                type='arrow-down'
                className={cx(styles.icon, isMenuOpened && styles.active)}
              />
            </div>
          )}
        </button>
      }
    >
      <Panel variant='modal' className={styles.context}>
        <div className={styles.group}>
          <Action>Save template</Action>

          <DialogLoadTemplate
            onClose={closeMenu}
            selectTemplate={selectTemplate}
            templates={templates}
            trigger={<Action>Load template</Action>}
          />
        </div>
        <div className={styles.group}>
          <FormDialogNewTemplate
            {...props}
            onClose={closeMenu}
            trigger={<Action>New template</Action>}
            onNew={onNewTemplate}
          />

          {selectedTemplate && (
            <>
              <FormDialogRenameTemplate
                onClose={closeMenu}
                trigger={<Action>Rename template</Action>}
                template={selectedTemplate}
                onRename={rerenderTemplate}
              />

              <FormDialogDuplicateTemplate
                onClose={closeMenu}
                trigger={<Action>Duplicate template</Action>}
                template={selectedTemplate}
                onDuplicate={closeMenu}
              />
            </>
          )}
        </div>
      </Panel>
    </ContextMenu>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.data
})

export default connect(mapStateToProps)(Template)
