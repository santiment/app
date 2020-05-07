import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import { prepareTemplateLink } from '../Dialog/LoadTemplate/Template'
import { useCreateTemplate } from '../gql/hooks'
import { notifyDuplication } from '../notifications'
import { checkIsLoggedIn } from '../../../../pages/UserSelectors'
import LoginDialogWrapper from '../../../../components/LoginDialog/LoginDialogWrapper'

const Trigger = ({ loading, onSubmit, ...rest }) => (
  <Button
    variant='fill'
    accent='positive'
    isLoading={loading}
    onClick={onSubmit}
    {...rest}
  >
    Use Chart Layout
  </Button>
)

const UseTemplateBtn = ({ template, redirect, onDuplicate, isLoggedIn }) => {
  if (!isLoggedIn) {
    return (
      <LoginDialogWrapper>
        <Trigger />
      </LoginDialogWrapper>
    )
  }

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

  return <Trigger loading={loading} onSubmit={onSubmit} />
}

const mapDispatchToProps = dispatch => ({
  redirect: route => {
    dispatch(push(route))
  }
})

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UseTemplateBtn)
