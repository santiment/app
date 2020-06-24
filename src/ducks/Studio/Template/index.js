import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import TemplateButton from './Button'
import {
  buildTemplateMetrics,
  getMultiChartsValue,
  parseTemplateMetrics,
} from './utils'
import { notifySave } from './notifications'
import {
  useUserTemplates,
  useUpdateTemplate,
  useSelectedTemplate,
  useCreateTemplate,
} from './gql/hooks'
import DialogFormNewTemplate from './Dialog/NewTemplate'
import DialogFormRenameTemplate from './Dialog/RenameTemplate'
import DialogFormDuplicateTemplate from './Dialog/DuplicateTemplate'
import DialogLoadTemplate from './Dialog/LoadTemplate'
import DeleteTemplate from './Dialog/Delete/DeleteTemplate'
import ShareTemplate from './Share/ShareTemplate'
import { isUserAuthorOfTemplate } from './Dialog/LoadTemplate/Template'
import styles from './index.module.scss'
import { parseSharedWidgets } from '../../Studio2/url'
import { normalizeWidgets } from '../../Studio2/url/generate'
import { newChartWidget } from '../../Studio2/Widget/creators'

const Action = (props) => <Button {...props} fluid variant='ghost' />

const isMac = /(Mac|iPhone|iPod|iPad)/i.test(window.navigator.platform)

function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef()

  useEffect(
    () => {
      savedHandler.current = handler
    },
    [handler],
  )

  useEffect(
    () => {
      const isSupported = element && element.addEventListener
      if (!isSupported) return

      const eventListener = (event) => savedHandler.current(event)

      element.addEventListener(eventName, eventListener)

      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    [eventName, element],
  )
}

export const useCtrlSPress = (callback) => {
  const listenHotkey = (e) => {
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
  const { projectId, isLoggedIn } = props
  const [templates] = useUserTemplates(currentUser.id)
  const [updateTemplate] = useUpdateTemplate()
  const [createTemplate] = useCreateTemplate()

  function selectTemplate(template) {
    setSelectedTemplate(template)

    if (!template) return

    const { project, metrics: templateMetrics, options } = template
    const { metrics, comparables } = parseTemplateMetrics(templateMetrics)

    if (onProjectSelect) onProjectSelect(project)

    let widgets
    if (options && options.widgets) {
      widgets = parseSharedWidgets(options.widgets)
    } else {
      widgets = [
        newChartWidget({
          metrics,
          comparables,
        }),
      ]
    }

    setWidgets(widgets)
  }

  const [selectedTemplate, setSelectedTemplate, loading] = useSelectedTemplate(
    templates,
    selectTemplate,
  )

  useCtrlSPress(() => {
    if (window.selectedTemplate) {
      saveTemplate()
    }
  })

  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const hasTemplates = templates.length > 0

  function openMenu() {
    setIsMenuOpened(true)
  }

  function closeMenu() {
    setIsMenuOpened(false)
  }

  function rerenderTemplate(template) {
    if (selectedTemplate && selectedTemplate.id === template.id) {
      setSelectedTemplate(template)
    }
  }

  const saveTemplate = () => {
    const { projectId } = props
    const template = selectedTemplate

    const { user: { id } = {}, title, description } = template

    const isCurrentUser = +id === +currentUser.id
    const metrics = widgets.map(({ metrics }) => metrics).flat()
    const comparables = widgets.map(({ comparables }) => comparables).flat()

    const options = {
      widgets: normalizeWidgets(widgets),
    }

    const future = isCurrentUser
      ? updateTemplate(template, {
          metrics,
          comparables,
          projectId,
          options,
        })
      : createTemplate({
          title,
          description,
          metrics: buildTemplateMetrics({ metrics, comparables }),
          projectId: +projectId,
          options,
        })

    future
      .then(selectTemplate)
      .then(closeMenu)
      .then(notifySave)
  }

  function onTemplateSelect(template) {
    selectTemplate(template)
    closeMenu()
  }

  function onDelete() {
    closeMenu()
  }

  useCtrlSPress(() => {
    if (selectedTemplate) {
      saveTemplate()
    }
  })

  const isAuthor = isUserAuthorOfTemplate(currentUser, selectedTemplate)

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
          loading={loading}
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
                onDuplicate={(template) => {
                  closeMenu()
                  selectTemplate(template)
                }}
              />

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
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.user.data,
})

export default connect(mapStateToProps)(Template)
