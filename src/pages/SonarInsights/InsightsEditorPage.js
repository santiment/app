import React, { Component } from 'react'
import { connect } from 'react-redux'
import InsightsEditor from './InsightsEditor'
import * as actions from './actions'

class InsightsEditorPage extends Component {
  componentWillUnmount () {
    this.props.wipeDraftUpdateData()
  }

  render () {
    return <InsightsEditor {...this.props} />
  }
}

const mapStateToProps = ({ insightDraft }, { id, updatedAt }) => {
  return {
    id: id || insightDraft.id,
    updatedAt: insightDraft.updatedAt || updatedAt,
    updating: insightDraft.updating
  }
}

const mapDispatchToProps = dispatch => ({
  updateDraft: payload =>
    dispatch({ type: actions.INSIGHT_DRAFT_UPDATE, payload }),
  wipeDraftUpdateData: () =>
    dispatch({ type: actions.INSIGHT_DRAFT_UPDATE_DATA_WIPE })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightsEditorPage)
