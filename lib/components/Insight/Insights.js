import React, { Component } from 'react';
import { Selector } from '@santiment-network/ui';
import InsightAddBtn from './InsightAddBtn';
import InsightsWrap from './InsightsWrap';
import { DesktopOnly } from '../Responsive';
import styles from './Insights.module.css';
const View = {
  RECENT: 'Recent',
  POPULAR: 'Popular'
};

const sortByRecent = ({
  createdAt: aCreatedAt
}, {
  createdAt: bCreatedAt
}) => new Date(aCreatedAt) < new Date(bCreatedAt) ? 1 : -1;

const sortByPopularity = ({
  votes: {
    totalVotes: aVotes
  }
}, {
  votes: {
    totalVotes: bVotes
  }
}) => aVotes < bVotes ? 1 : -1;

class Insights extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      view: View.RECENT
    };

    this.onViewSelect = newView => {
      const {
        view
      } = this.state;
      if (newView === view) return;
      this.setState({
        view: newView
      });
    };
  }

  render() {
    const {
      view
    } = this.state;
    const {
      title,
      insights,
      className
    } = this.props;
    const length = insights.length;
    return /*#__PURE__*/React.createElement("div", {
      className: className
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.top
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.title
    }, title, /*#__PURE__*/React.createElement("span", {
      className: styles.count
    }, " (", length, ")")), /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement("div", {
      className: styles.controls
    }, length > 0 && /*#__PURE__*/React.createElement(Selector, {
      className: styles.selectors,
      options: [View.RECENT, View.POPULAR],
      onSelectOption: this.onViewSelect,
      defaultSelected: View.RECENT
    }), /*#__PURE__*/React.createElement(InsightAddBtn, null)))), /*#__PURE__*/React.createElement(InsightsWrap, {
      withAuthorPic: true,
      insights: insights.sort(view === View.RECENT ? sortByRecent : sortByPopularity)
    }));
  }

}

Insights.defaultProps = {
  insights: [],
  title: 'Insights',
  className: ''
};
export default Insights;