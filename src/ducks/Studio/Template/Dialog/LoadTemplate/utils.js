import { useState } from 'react'
import { useUpdateTemplate } from '../../gql/hooks'

export const isUserAuthorOfTemplate = (user, template) => {
  if (!template) {
    return false
  }
  const { user: { id } = {} } = template
  return user && (user.data ? +user.data.id : +user.id) === +id
}

export const usePublicTemplates = template => {
  const [updateTemplate] = useUpdateTemplate()
  const [isPublic, setIsPublic] = useState(template.isPublic)
  function toggleIsPublic (e) {
    e.stopPropagation()

    setIsPublic(state => {
      const newState = !state
      updateTemplate(template, { isPublic: newState })
      return newState
    })
  }

  return { isPublic, toggleIsPublic }
}
