export const isERC20 = project =>
  project && project.mainContractAddress && project.infrastructure === 'ETH'

const defaulFilter = project => project

export const getCurrencies = (allProjects = []) =>
  allProjects.filter(project => !isERC20(project) && defaulFilter(project))

export const getAll = (allProjects = []) => allProjects.filter(defaulFilter)
