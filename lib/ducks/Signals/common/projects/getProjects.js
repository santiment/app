const _excluded = ["render"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { checkIsLoggedIn } from '../../../../pages/UserSelectors';
import { ALL_PROJECTS_FOR_SEARCH_QUERY } from '../../../Watchlists/gql/allProjectsGQL';

const GetProjects = _ref => {
  let {
    render
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return render(props);
};

GetProjects.defaultProps = {
  allProjects: [],
  isLoading: false
};

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state)
});

export default compose(connect(mapStateToProps), graphql(ALL_PROJECTS_FOR_SEARCH_QUERY, {
  skip: ({
    isLoggedIn,
    skipLoggedInState
  }) => skipLoggedInState ? false : !isLoggedIn,
  options: () => ({
    context: {
      isRetriable: true
    },
    variables: {
      minVolume: 0
    }
  }),
  props: ({
    data
  }) => {
    const projects = data['allProjects'] || [];
    return {
      allProjects: [...projects],
      isLoading: data.loading
    };
  }
}))(GetProjects);