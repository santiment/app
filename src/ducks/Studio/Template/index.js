import React, { useState } from 'react'
import { connect } from 'react-redux'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import TemplateButton from './Button'
import { parseTemplateMetrics } from './utils'
import { notifySave } from './notifications'
import {
  useUserTemplates,
  useUpdateTemplate,
  useSelectedTemplate
} from './gql/hooks'
import DialogFormNewTemplate from './Dialog/NewTemplate'
import DialogFormRenameTemplate from './Dialog/RenameTemplate'
import DialogFormDuplicateTemplate from './Dialog/DuplicateTemplate'
import DialogLoadTemplate from './Dialog/LoadTemplate'
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
  const [updateTemplate] = useUpdateTemplate()
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
  }

  function rerenderTemplate (template) {
    if (selectedTemplate && selectedTemplate.id === template.id) {
      setSelectedTemplate(template)
    }
  }

  function saveTemplate () {
    const { metrics, comparables, projectId } = props

    updateTemplate(selectedTemplate, {
      metrics,
      comparables,
      projectId
    })
      .then(closeMenu)
      .then(notifySave)
  }

  function onTemplateSelect (template) {
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
          {selectedTemplate && (
            <Action onClick={saveTemplate}>Save template</Action>
          )}

          <DialogLoadTemplate
            onClose={closeMenu}
            selectedTemplate={selectedTemplate}
            selectTemplate={onTemplateSelect}
            updateTemplate={updateTemplate}
            rerenderTemplate={rerenderTemplate}
            templates={templates}
            trigger={<Action>Load template</Action>}
          />
        </div>
        <div className={styles.group}>
          <DialogFormNewTemplate
            {...props}
            onClose={closeMenu}
            trigger={<Action>New template</Action>}
            onNew={onTemplateSelect}
          />

          {selectedTemplate && (
            <>
              <DialogFormRenameTemplate
                onClose={closeMenu}
                trigger={<Action>Rename template</Action>}
                template={selectedTemplate}
                onRename={closeMenu}
              />

              <DialogFormDuplicateTemplate
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
