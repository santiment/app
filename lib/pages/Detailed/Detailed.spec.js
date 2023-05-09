/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import Detailed from './Detailed';
describe('Project detail page container', () => {
  it('it should render correctly', () => {
    const store = configureStore([])({
      user: {
        data: {}
      },
      rootUi: {}
    });
    const match = {
      params: {
        ticker: 'AE'
      }
    };
    const pdp = shallow( /*#__PURE__*/React.createElement(Provider, {
      store: store
    }, /*#__PURE__*/React.createElement(Detailed, {
      project: {
        id: 12,
        name: 'Aragorn',
        ticker: 'AE',
        priceUsd: 10
      },
      match: match
    })));
    expect(toJson(pdp)).toMatchSnapshot();
  });
});