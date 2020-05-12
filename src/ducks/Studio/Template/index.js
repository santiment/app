import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import TemplateButton from './Button'
import {
  buildTemplateMetrics,
  getMultiChartsValue,
  parseTemplateMetrics
} from './utils'
import { notifySave } from './notifications'
import {
  useUserTemplates,
  useUpdateTemplate,
  useSelectedTemplate,
  useCreateTemplate
} from './gql/hooks'
import DialogFormNewTemplate from './Dialog/NewTemplate'
import DialogFormRenameTemplate from './Dialog/RenameTemplate'
import DialogFormDuplicateTemplate from './Dialog/DuplicateTemplate'
import DialogLoadTemplate from './Dialog/LoadTemplate'
import styles from './index.module.scss'

const Action = props => (
  <Button {...props} fluid variant='ghost' className={styles.action} />
)

const isMac = /(Mac|iPhone|iPod|iPad)/i.test(window.navigator.platform)

export const useCtrlSPress = callback => {
  useEffect(() => {
    function listenHotkey (e) {
      const { ctrlKey, metaKey, code } = e

      if ((metaKey || ctrlKey) && code === 'KeyS') {
        e.preventDefault()

        callback()
      }
    }

    window.addEventListener('keydown', listenHotkey)
    return () => {
      window.removeEventListener('keydown', listenHotkey)
    }
  }, [])
}

const Template = ({
  className,
  currentUser,
  setMetrics,
  setComparables,
  toggleMultiCharts,
  onProjectSelect,
  ...props
}) => {
  const { projectId, isLoggedIn } = props
  const [templates] = useUserTemplates(currentUser.id)
  const [updateTemplate] = useUpdateTemplate()
  const [createTemplate] = useCreateTemplate()
  const [selectedTemplate, setSelectedTemplate] = useSelectedTemplate(
    templates[0]
  )

  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const hasTemplates = templates.length > 0

  function openMenu () {
    setIsMenuOpened(true)
  }

  function closeMenu () {
    setIsMenuOpened(false)
  }

  function selectTemplate (template) {
    setSelectedTemplate(template)

    if (!template) return

    const { project, metrics: templateMetrics } = template
    const { metrics, comparables } = parseTemplateMetrics(templateMetrics)

    onProjectSelect(project)
    setMetrics(metrics)
    setComparables(comparables)
    toggleMultiCharts(getMultiChartsValue(template))
  }

  function rerenderTemplate (template) {
    if (selectedTemplate && selectedTemplate.id === template.id) {
      setSelectedTemplate(template)
    }
  }

  const saveTemplate = () => {
    const { metrics, comparables, projectId } = props

    const template = selectedTemplate || window.selectedTemplate

    const { user: { id } = {}, title, description } = template

    const isCurrentUser = +id === +currentUser.id

    const future = isCurrentUser
      ? updateTemplate(template, {
        metrics,
        comparables,
        projectId
      })
      : createTemplate({
        title,
        description,
        metrics: buildTemplateMetrics({ metrics, comparables }),
        projectId: +projectId
      })

    future
      .then(selectTemplate)
      .then(closeMenu)
      .then(notifySave)
  }

  function onTemplateSelect (template) {
    selectTemplate(template)
    closeMenu()
  }

  useCtrlSPress(() => {
    if (window.selectedTemplate) {
      saveTemplate()
    }
  })

  // TODO: 2.05.2020, GarageInc, for useCtrlSPress
  window.selectedTemplate = selectedTemplate

  const isAuthor =
    selectedTemplate && +selectedTemplate.user.id === +currentUser.id

  return (
    <ContextMenu
      open={isMenuOpened}
      onClose={closeMenu}
      position='bottom'
      align='start'
      trigger={
        <TemplateButton
          {...props}
          selectedTemplate={selectedTemplate}
          hasTemplates={hasTemplates}
          openMenu={openMenu}
          saveTemplate={saveTemplate}
          onNewTemplate={onTemplateSelect}
          isMenuOpened={isMenuOpened}
        />
      }
    >
      <Panel variant='modal' className={styles.context}>
        <div className={styles.group}>
          {selectedTemplate && isLoggedIn && (
            <Action onClick={saveTemplate}>
              Save{' '}
              <span className={styles.copyAction}>
                {isMac ? 'Cmd + S' : 'Ctrl + S'}
              </span>
            </Action>
          )}

          {selectedTemplate && (
            <DialogFormNewTemplate
              {...props}
              onClose={closeMenu}
              trigger={<Action>Save as new Chart Layout</Action>}
              title='Save as new Chart Layout'
              onNew={onTemplateSelect}
              buttonLabel='Save'
            />
          )}

          <DialogLoadTemplate
            onClose={closeMenu}
            selectedTemplate={selectedTemplate}
            selectTemplate={onTemplateSelect}
            updateTemplate={updateTemplate}
            rerenderTemplate={rerenderTemplate}
            templates={templates}
            trigger={<Action>Load</Action>}
            projectId={projectId}
          />
        </div>
        <div className={styles.group}>
          <DialogFormNewTemplate
            {...props}
            onClose={closeMenu}
            trigger={<Action>New</Action>}
            onNew={onTemplateSelect}
          />

          {selectedTemplate && (
            <>
              {isAuthor && (
                <DialogFormRenameTemplate
                  onClose={closeMenu}
                  trigger={<Action>Edit</Action>}
                  template={selectedTemplate}
                  onRename={closeMenu}
                />
              )}

              <DialogFormDuplicateTemplate
                onClose={closeMenu}
                trigger={<Action>Duplicate</Action>}
                template={selectedTemplate}
                onDuplicate={template => {
                  closeMenu()
                  selectTemplate(template)
                }}
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
