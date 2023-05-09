import React from 'react';
import { connect } from 'react-redux';
import { useSignals } from '../../ducks/Signals/common/getSignals';
import PageLoader from '../../components/Loader/PageLoader';
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid';
import SonarFeedRecommendations from './SonarFeedRecommendations';

const SignalsList = ({
  filters,
  userId,
  showRecommendations = true
}) => {
  const {
    data: signals = [],
    loading
  } = useSignals({
    filters,
    skip: !userId
  });
  const hasSignals = signals && signals.length > 0;

  if (loading) {
    return /*#__PURE__*/React.createElement(PageLoader, null);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, hasSignals ? /*#__PURE__*/React.createElement(SignalCardsGrid, {
    signals: signals,
    ownerId: userId
  }) : showRecommendations && /*#__PURE__*/React.createElement(SonarFeedRecommendations, {
    showButton: true
  }));
};

const mapStateToProps = ({
  user
}) => ({
  userId: user && user.data ? user.data.id : undefined
});

export default connect(mapStateToProps)(SignalsList);