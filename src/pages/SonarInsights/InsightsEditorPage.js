import React, { Component } from 'react'
import { connect } from 'react-redux'
import InsightsEditor from './InsightsEditor'
import * as actions from './actions'

class InsightsEditorPage extends Component {
  componentWillUnmount () {
    this.props.wipeDraftUpdateData()
  }

  render () {
    const { isPublished, history, ...rest } = this.props

    if (isPublished) {
      // NOTE(vanguard): in future show thank you message
      history.push('/insights-sonar/my')
    }

    return <InsightsEditor {...rest} />
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
)(InsightsEditorPage)
