import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import InsightEditor from '../../components/Insight/InsightEditor/InsightEditor'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import * as actions from './actions'

class InsightCreationPage extends Component {
  componentWillUnmount () {
    this.props.wipeDraftUpdateData()
  }

  render () {
    const {
      isPublished,
      location: { search },
      selectedTrends,
      ...rest
    } = this.props

    if (isPublished) {
      // NOTE(vanguard): in future show thank you message
      return <Redirect to='/insights/my' />
    }

    let tags
    if (search.includes('currentTrends')) {
      tags = [...selectedTrends].map(tag => ({ name: tag.toUpperCase() }))
    }

    return (
      <>
        {!this.props.isDesktop && (
          <MobileHeader title='All Insights' backRoute='/insights' />
        )}
        <InsightEditor tags={tags} {...rest} />
      </>
    )
  }
}

const mapStateToProps = (
  { insightDraft, hypedTrends: { selectedTrends } },
  { id, updatedAt }
) => {
  return {
    id: id || insightDraft.id,
    updatedAt: insightDraft.updatedAt || updatedAt,
    isUpdating: insightDraft.isUpdating,
    isPublished: insightDraft.isPublished,
    selectedTrends
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
