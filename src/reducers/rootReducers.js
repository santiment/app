import { combineReducers } from 'redux'
import user from './user'
import projects from './projects'
import timeseries from './../ducks/GetTimeSeries/reducers'
import signals from './../ducks/Signals/reducers'
import rootUi from './root-ui'
import detailedPageUi from './detailed-page-ui'
import insightsPageUi from './insights-page-ui'
import notification from './notification'
import watchlistUi from './watchlist-ui'
import news from './../components/News/reducers'
import hypedTrends from './../components/Trends/reducers'
import socialVolume from './../components/SocialVolumeWidget/reducers'
import accountUi from '../pages/Account/reducers'
import insightDraft from '../pages/Insights/reducers'

export default combineReducers({
  user,
  projects,
  hypedTrends,
  timeseries,
  signals,
  rootUi,
  detailedPageUi,
  insightsPageUi,
  watchlistUi,
  notification,
  socialVolume,
  accountUi,
  insightDraft,
  news
})
