import getEnhancedProjects from './getEnhancedProjects'
import { allProjectsForSearchGQL } from '../../../../pages/Projects/allProjectsGQL'

export default getEnhancedProjects({
  query: allProjectsForSearchGQL,
  name: 'allProjects',
  requiresAuth: true
})
