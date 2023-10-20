import { rtkApi } from '@/shared/api/rtkApi';
import { IRating } from '@/entities/Rating';

interface GerArticleRatingArgs {
  userId: string;
  articleId: string;
}
interface RateArticleArgs extends IRating {
  userId: string;
  articleId: string;
}


const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getRating: build.query<IRating[], GerArticleRatingArgs>({
      query: ({ userId, articleId }) => ({
        url: '/article-ratings',
        params: {
          userId,
          articleId,
        },
      }),
    }),
    rateArticle: build.mutation<void,RateArticleArgs >({
      query: (arg) => ({
        url: '/article-ratings',
        method: 'POST',
        body:arg
      }),
    }),
  }),
});

export const useGetArticleRating = articleRatingApi.useGetRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation
