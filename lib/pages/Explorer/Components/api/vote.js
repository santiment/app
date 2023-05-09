import { mutate } from 'webkit/api';

const VOTE_MUTATION = (id, voteType) => `
    mutation {
        vote(${voteType}:${id}) { 
            votes {
                totalVotes
            }
        }
    }
`;

export default ((id, voteType) => mutate(VOTE_MUTATION(id, voteType)).then(({
  vote: {
    votes
  }
}) => votes));