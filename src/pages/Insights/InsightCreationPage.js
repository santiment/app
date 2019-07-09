import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { showNotification } from '../../actions/rootActions'
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
      username,
      setNotification,
      ...rest
    } = this.props

    if (isPublished) {
      setNotification('Thank you for insight')
      return <Redirect to='/insights/my' />
    }

    if (!username) {
      return <Redirect to='/account' />
    }

    let tags
    if (search.includes('currentTrends')) {
      tags = [...selectedTrends].map(tag => ({ name: tag.toUpperCase() }))
    }

    return (
      <>
        <Helmet>
          <title>Draft insight</title>
        </Helmet>
        {!this.props.isDesktop && (
          <MobileHeader title='All Insights' backRoute='/insights' />
        )}
        <InsightEditor tags={tags} {...rest} />
      </>
    )
  }
}

const mapStateToProps = (
  {
    insightDraft,
    hypedTrends: { selectedTrends },
    user: {
      data: { username }
    }
  },
  { id, updatedAt }
) => {
  return {
    id: id || insightDraft.id,
    updatedAt: insightDraft.updatedAt || updatedAt,
    isUpdating: insightDraft.isUpdating,
    isPublished: insightDraft.isPublished,
    username,
    selectedTrends
  }
}

const mapDispatchToProps = dispatch => ({
  updateDraft: payload =>
    dispatch({ type: actions.INSIGHT_DRAFT_UPDATE, payload }),
  publishDraft: payload => {
    dispatch({ type: actions.INSIGHT_DRAFT_PUBLISH, payload })
  },
  wipeDraftUpdateData: () =>
    dispatch({ type: actions.INSIGHT_DRAFT_UPDATE_DATA_WIPE }),
  setNotification: message => dispatch(showNotification(message))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightCreationPage)
