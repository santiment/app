import React, { useEffect, useState, useCallback } from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { withRouter } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import TemplateButton from './Button'
import TemplateTitle from './Title'
import {
  buildTemplateMetrics,
  extractTemplateProject,
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
import DialogLoadTemplate from './Dialog/LoadTemplate'
import DeleteTemplate from './Dialog/Delete/DeleteTemplate'
import ShareTemplate from './Share/ShareTemplate'
import { isUserAuthorOfTemplate } from './Dialog/LoadTemplate/Template'
import { useKeyboardCmdShortcut } from '../hooks'
import { parseSharedWidgets, translateMultiChartToWidgets } from '../url/parse'
import { normalizeWidgets } from '../url/generate'
import ChartWidget from '../Widget/ChartWidget'
import { useUser } from '../../../stores/user'
import { useProjectById } from '../../../hooks/project'
import { PATHS } from '../../../App'
import { useCtrlSPress } from '../../../hooks/eventListeners'
import styles from './index.module.scss'

const Action = props => <Button {...props} fluid variant='ghost' />

const isMac = /(Mac|iPhone|iPod|iPad)/i.test(window.navigator.platform)

const Template = ({
  className,
  currentUser,
  widgets,
  setWidgets,
  onProjectSelect,
  location: { pathname },
  ...props
}) => {
  const { user } = useUser()
  const { projectId } = props
  const [templates] = useUserTemplates(user && user.id)
  const [updateTemplate] = useUpdateTemplate()
  const [createTemplate] = useCreateTemplate()
  const [isLoadDialogOpened, setIsLoadDialogOpened] = useState(false)

  const projectFromUrl = extractTemplateProject()
  const [urlProject] = useProjectById(projectFromUrl)

  const selectTemplate = template => {
    setSelectedTemplate(template)

    if (!template) return

    const { project, metrics: templateMetrics, options } = template
    const { metrics, comparables } = parseTemplateMetrics(templateMetrics)

    if (onProjectSelect && !projectFromUrl && project) {
      onProjectSelect(project)
    }

    let widgets
    if (options && options.widgets) {
      widgets = parseSharedWidgets(options.widgets)
    } else {
      if (options && options.multi_chart) {
        widgets = translateMultiChartToWidgets(metrics, comparables)
      } else {
        widgets = [
          ChartWidget.new({
            metrics,
            comparables
          })
        ]
      }
    }

    setWidgets(widgets)
  }

  const [selectedTemplate, setSelectedTemplate, loading] = useSelectedTemplate(
    templates,
    selectTemplate
  )

  const toggleLoadDialog = useCallback(
    () => {
      setIsLoadDialogOpened(!isLoadDialogOpened)
    },
    [setIsLoadDialogOpened, isLoadDialogOpened]
  )

  useKeyboardCmdShortcut('l', toggleLoadDialog)

  useEffect(
    () => {
      if (onProjectSelect && urlProject) {
        onProjectSelect(urlProject)
      }
    },
    [urlProject]
  )

  useEffect(
    () => {
      if (pathname === PATHS.CHARTS) {
        selectTemplate()
      }
    },
    [pathname]
  )

  useCtrlSPress(() => {
    if (selectedTemplate) {
      saveTemplate()
    }
  })

  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const hasTemplates = templates.length > 0

  const openMenu = useCallback(
    () => {
      setIsMenuOpened(true)
    },
    [setIsMenuOpened]
  )

  const closeLoadDialog = useCallback(
    () => {
      setIsLoadDialogOpened(false)
    },
    [setIsLoadDialogOpened]
  )

  const closeMenu = useCallback(
    () => {
      setIsMenuOpened(false)
      closeLoadDialog()
    },
    [setIsMenuOpened, closeLoadDialog]
  )

  const rerenderTemplate = useCallback(
    template => {
      if (selectedTemplate && selectedTemplate.id === template.id) {
        setSelectedTemplate(template)
      }
    },
    [selectedTemplate, setSelectedTemplate]
  )

  const saveTemplate = useCallback(
    () => {
      const template = selectedTemplate || {}

      const { user: { id } = {}, title, description } = template

      const isCurrentUser = +id === +user.id
      const metrics = widgets.map(({ metrics }) => metrics).flat()
      const comparables = widgets.map(({ comparables }) => comparables).flat()

      const options = {
        widgets: normalizeWidgets(widgets)
      }

      const future = isCurrentUser
        ? updateTemplate(template, {
          metrics,
          comparables,
          projectId,
          options
        })
        : createTemplate({
          title,
          description,
          metrics: buildTemplateMetrics({ metrics, comparables }),
          projectId: +projectId,
          options
        })

      future
        .then(selectTemplate)
        .then(closeMenu)
        .then(notifySave)
    },
    [
      projectId,
      selectedTemplate,
      user,
      widgets,
      updateTemplate,
      createTemplate,
      selectTemplate,
      closeMenu,
      notifySave
    ]
  )

  const onTemplateSelect = useCallback(
    template => {
      selectTemplate(template)
      closeMenu()
    },
    [selectTemplate, closeMenu]
  )

  const onDelete = useCallback(
    () => {
      closeMenu()
    },
    [closeMenu]
  )

  const isAuthor = isUserAuthorOfTemplate(user, selectedTemplate)

  const openLoadDialog = useCallback(
    () => {
      setIsLoadDialogOpened(true)
    },
    [setIsLoadDialogOpened]
  )

  return (
    <>
      {selectedTemplate && <TemplateTitle template={selectedTemplate} />}
      <ContextMenu
        open={isMenuOpened}
        onClose={closeMenu}
        position='bottom'
        align='start'
        trigger={
          <TemplateButton
            {...props}
            selectedTemplate={selectedTemplate}
            widgets={widgets}
            hasTemplates={hasTemplates}
            openMenu={openMenu}
            saveTemplate={saveTemplate}
            onNewTemplate={onTemplateSelect}
            isMenuOpened={isMenuOpened}
            loading={loading}
            isLoggedIn={user}
          />
        }
      >
        <Panel variant='modal' className={styles.context}>
          {selectedTemplate && (
            <div className={styles.group}>
              {user && (
                <Action onClick={saveTemplate}>
                  Save{' '}
                  <span className={styles.copyAction}>
                    {isMac ? 'Cmd + S' : 'Ctrl + S'}
                  </span>
                </Action>
              )}

              <DialogFormNewTemplate
                {...props}
                onClose={closeMenu}
                widgets={widgets}
                trigger={<Action>Save as new Chart Layout</Action>}
                title='Save as new Chart Layout'
                onNew={onTemplateSelect}
                buttonLabel='Save'
              />
              {isAuthor && (
                <DialogFormRenameTemplate
                  onClose={closeMenu}
                  trigger={<Action>Edit</Action>}
                  template={selectedTemplate}
                  onRename={closeMenu}
                />
              )}
            </div>
          )}

          <div className={styles.group}>
            <Action onClick={openLoadDialog}>Load</Action>

            <DialogFormNewTemplate
              {...props}
              onClose={closeMenu}
              widgets={widgets}
              trigger={<Action>New</Action>}
              onNew={onTemplateSelect}
            />

            {selectedTemplate && (
              <>
                <ShareTemplate
                  template={selectedTemplate}
                  className={styles.shareBtn}
                  fluid
                  variant='ghost'
                />

                <DeleteTemplate
                  isAuthor={isAuthor}
                  onDelete={onDelete}
                  closeMenu={closeMenu}
                  template={selectedTemplate}
                  className={styles.delete}
                />
              </>
            )}
          </div>
        </Panel>
      </ContextMenu>

      <DialogLoadTemplate
        open={isLoadDialogOpened}
        onClose={closeMenu}
        selectedTemplate={selectedTemplate}
        selectTemplate={onTemplateSelect}
        updateTemplate={updateTemplate}
        rerenderTemplate={rerenderTemplate}
        templates={templates}
        projectId={projectId}
      />
    </>
  )
}

export default withRouter(Template)
