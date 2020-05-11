import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import { prepareTemplateLink } from '../Dialog/LoadTemplate/Template'

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

const UseTemplateBtn = ({ template, onClick, redirect }) => {
  function onSubmit () {
    redirect(prepareTemplateLink(template))
    onClick()
  }

  return <Trigger onSubmit={onSubmit} />
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
