import { client } from "../../../index";
import {
  LIKE_INSIGHT_MUTATION,
  UNLIKE_INSIGHT_MUTATION
} from "../../Like/likesGQL";

export function toggleInsightLike(insightId, shouldLike) {
  return client.mutate({
    mutation: shouldLike ? LIKE_INSIGHT_MUTATION : UNLIKE_INSIGHT_MUTATION,
    variables: {
      id: +insightId
    }
  });
}
