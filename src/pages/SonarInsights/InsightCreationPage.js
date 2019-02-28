import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import InsightEditor from './InsightEditor/InsightEditor'
import * as actions from './actions'

class InsightCreationPage extends Component {
  componentWillUnmount () {
    this.props.wipeDraftUpdateData()
  }

  render () {
    const { isPublished, ...rest } = this.props

    if (isPublished) {
      // NOTE(vanguard): in future show thank you message
      return <Redirect to='/insights/my' />
    }

    return <InsightEditor {...rest} />
  }
}

const mapStateToProps = ({ insightDraft }, { id, updatedAt }) => {
  return {
    id: id || insightDraft.id,
    updatedAt: insightDraft.updatedAt || updatedAt,
    isUpdating: insightDraft.isUpdating,
    isPublished: insightDraft.isPublished
  }
}

const mapDispatchToProps = dispatch => ({
  updateDraft: payload =>
    dispatch({ type: actions.INSIGHT_DRAFT_UPDATE, payload }),
  publishDraft: payload =>
    dispatch({ type: actions.INSIGHT_DRAFT_PUBLISH, payload }),
  wipeDraftUpdateData: () =>
    dispatch({ type: actions.INSIGHT_DRAFT_UPDATE_DATA_WIPE })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightCreationPage)
