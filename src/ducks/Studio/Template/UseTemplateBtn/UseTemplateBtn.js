import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import { prepareTemplateLink } from '../Dialog/LoadTemplate/Template'
import { useCreateTemplate } from '../gql/hooks'
import { notifyDuplication } from '../notifications'

const UseTemplateBtn = ({ template, redirect, onDuplicate }) => {
  const [createTemplate, { loading }] = useCreateTemplate()

  function onSubmit () {
    const { metrics, project, isPublic, options, description, title } = template

    createTemplate({
      title,
      description,
      metrics,
      isPublic,
      projectId: +project.id,
      options: JSON.stringify(options)
    })
      .then(() => {
        redirect(prepareTemplateLink(template))
        onDuplicate()
      })
      .then(notifyDuplication)
  }

  return (
    <Button
      variant='fill'
      accent='positive'
      isLoading={loading}
      onClick={onSubmit}
    >
      Use Chart Layout
    </Button>
  )
}

const mapDispatchToProps = dispatch => ({
  redirect: route => {
    dispatch(push(route))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(UseTemplateBtn)
