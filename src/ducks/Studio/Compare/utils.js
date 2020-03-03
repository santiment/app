export const projectSorter = ({ rank: a }, { rank: b }) => a - b

export const hashComparable = ({ project, metric }) => project.slug + metric.key
