import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import TemplateButton from './Button'
import TemplateTitle from './Title'
import { buildTemplateMetrics, parseTemplateMetrics } from './utils'
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
import DeleteTemplate from './Dialog/Delete/DeleteTemplate'
import ShareTemplate from './Share/ShareTemplate'
import { isUserAuthorOfTemplate } from './Dialog/LoadTemplate/Template'
import { parseSharedWidgets, translateMultiChartToWidgets } from '../url/parse'
import { normalizeWidgets } from '../url/generate'
import ChartWidget from '../Widget/ChartWidget'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import styles from './index.module.scss'

const Action = props => <Button {...props} fluid variant='ghost' />

const isMac = /(Mac|iPhone|iPod|iPad)/i.test(window.navigator.platform)

function useEventListener (eventName, handler, element = window) {
  const savedHandler = useRef()

  useEffect(
    () => {
      savedHandler.current = handler
    },
    [handler]
  )

  useEffect(
    () => {
      const isSupported = element && element.addEventListener
      if (!isSupported) return

      const eventListener = event => savedHandler.current(event)

      element.addEventListener(eventName, eventListener)

      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    [eventName, element]
  )
}

export const useCtrlSPress = callback => {
  const listenHotkey = e => {
    const { ctrlKey, metaKey, code } = e

    if ((metaKey || ctrlKey) && code === 'KeyS') {
      e.preventDefault()

      callback()
    }
  }

  useEventListener('keydown', listenHotkey)
}

const Template = ({
  className,
  currentUser,
  widgets,
  setWidgets,
  onProjectSelect,
  ...props
}) => {
  const user = currentUser.data
  const { projectId, isLoggedIn } = props
  const [templates] = useUserTemplates(user.id)
  const [updateTemplate] = useUpdateTemplate()
  const [createTemplate] = useCreateTemplate()

  function selectTemplate (template) {
    setSelectedTemplate(template)

    if (!template) return

    const { project, metrics: templateMetrics, options } = template
    const { metrics, comparables } = parseTemplateMetrics(templateMetrics)

    if (onProjectSelect) {
      onProjectSelect(project)
    }

    let widgets
    if (options && options.widgets) {
      widgets = parseSharedWidgets(options.widgets)
    } else {
      if (options.multi_chart) {
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

  useCtrlSPress(() => {
    if (window.selectedTemplate) {
      saveTemplate()
    }
  })

  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const hasTemplates = templates.length > 0

  function openMenu () {
    setIsMenuOpened(true)
  }

  function closeMenu () {
    setIsMenuOpened(false)
  }

  function rerenderTemplate (template) {
    if (selectedTemplate && selectedTemplate.id === template.id) {
      setSelectedTemplate(template)
    }
  }

  const saveTemplate = () => {
    const { projectId } = props
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
  }

  function onTemplateSelect (template) {
    selectTemplate(template)
    closeMenu()
  }

  function onDelete () {
    closeMenu()
  }

  useCtrlSPress(() => {
    if (selectedTemplate) {
      saveTemplate()
    }
  })

  const isAuthor = isUserAuthorOfTemplate(currentUser, selectedTemplate)

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
            isLoggedIn={isLoggedIn}
          />
        }
      >
        <Panel variant='modal' className={styles.context}>
          {selectedTemplate && (
            <div className={styles.group}>
              {isLoggedIn && (
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

              <DialogFormDuplicateTemplate
                onClose={closeMenu}
                trigger={<Action>Duplicate</Action>}
                template={selectedTemplate}
                onDuplicate={template => {
                  closeMenu()
                  selectTemplate(template)
                }}
              />
            </div>
          )}

          <div className={styles.group}>
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
    </>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user,
  isLoggedIn: checkIsLoggedIn(state)
})

export default connect(mapStateToProps)(Template)
