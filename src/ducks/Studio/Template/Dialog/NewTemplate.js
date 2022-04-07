import React from 'react'
import { track } from 'webkit/analytics'
import { Event } from 'studio/analytics'
import DialogForm from './DialogForm'
import { notifyCreation } from '../notifications'
import { buildTemplateMetrics } from '../utils'
import { useCreateTemplate } from '../gql/hooks'
import { normalizeWidgets } from '../../url/generate'

const NewTemplate = ({ onNew, projectId, widgets, saveWidgets = normalizeWidgets, ...props }) => {
  const [createTemplate, { loading }] = useCreateTemplate()

  function onSubmit({ title, description }) {
    const metrics = widgets
      .map(({ metrics }) => metrics)
      .flat()
      .filter(Boolean)
    const comparables = widgets
      .map(({ comparables }) => comparables)
      .flat()
      .filter(Boolean)

    const options = {
      widgets: saveWidgets(widgets),
    }

    createTemplate({
      title,
      description,
      options,
      metrics: buildTemplateMetrics({ metrics, comparables }),
      projectId: +projectId,
    })
      .then((template) => {
        track.event(Event.NewLayout, { id: template.id })
        return onNew(template)
      })
      .then(notifyCreation)
  }

  return (
    <DialogForm
      {...props}
      title='New Chart Layout'
      onFormSubmit={onSubmit}
      buttonLabel='Create'
      isLoading={loading}
    />
  )
}

export default NewTemplate
