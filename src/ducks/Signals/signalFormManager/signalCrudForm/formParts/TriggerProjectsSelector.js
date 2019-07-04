import TriggerProjectsSelectorWrapper, {
  TriggerProjectsSelector
} from './TriggerProjectsSelectorWrapper'

export const ProjectsByErc20 = TriggerProjectsSelectorWrapper({
  type: 'erc20'
})(TriggerProjectsSelector)
export const ProjectsAll = TriggerProjectsSelectorWrapper({ type: 'all' })(
  TriggerProjectsSelector
)
