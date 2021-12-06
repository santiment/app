import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const ALL_PROJECTS = gql`
{
    allProjects {
        id
        name
        ticker
        logoUrl
    }
}`

export const useAllProjects = () => {
    const { data, loading, error } = useQuery(ALL_PROJECTS)
    return { data: (data && data.allProjects) ? data.allProjects : [], loading, error }
}
