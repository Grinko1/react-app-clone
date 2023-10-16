
import { rtkApi } from "shared/api/rtkApi";
import { Article } from 'entities/Article/model/types/article';


const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query<Article[], number>({
      query: (limit) => ({
        url: '/articles',
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;