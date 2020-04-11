import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import DialogLoadTemplate from './DialogLoadTemplate'
import { parseTemplateMetrics, getMetricKey } from './utils'
import { useUserTemplates, useUpdateTemplate } from './gql/hooks'
import FormDialogNewTemplate from './FormDialog/NewTemplate'
import FormDialogRenameTemplate from './FormDialog/RenameTemplate'
import FormDialogDuplicateTemplate from './FormDialog/DuplicateTemplate'
import styles from './index.module.scss'
import TemplateButton from './Button'

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

  function rerenderTemplate (template) {
    if (selectedTemplate.id === template.id) {
      setSelectedTemplate(template)
    }
  }

  function saveTemplate () {
    const { metrics, comparables, projectId } = props

    updateTemplate(selectedTemplate, {
      metrics,
      comparables,
      projectId
    }).then(closeMenu)
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
        <TemplateButton
          {...props}
          selectedTemplate={selectedTemplate}
          hasTemplates={hasTemplates}
          openMenu={openMenu}
          saveTemplate={saveTemplate}
          onNew={onNewTemplate}
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
            selectTemplate={selectTemplate}
            updateTemplate={updateTemplate}
            rerenderTemplate={rerenderTemplate}
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
                onRename={closeMenu}
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
