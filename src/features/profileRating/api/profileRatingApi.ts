import { rtkApi } from '@/shared/api/rtkApi';
import { IRating } from '@/entities/Rating';

interface GerProfileRatingArgs {
  userId: string;
  profileId: string;
}
interface RateProfileArgs extends IRating {
  userId: string;
  profileId: string;
}

const profileRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getRating: build.query<IRating[], GerProfileRatingArgs>({
      query: ({ userId, profileId }) => ({
        url: '/profile-ratings',
        params: {
          userId,
          profileId,
        },
      }),
    }),
    rateProfile: build.mutation<void, RateProfileArgs >({
      query: (arg) => ({
        url: '/article-ratings',
        method: 'POST',
        body: arg,
      }),
    }),
  }),
});

export const useGetProfileRating = profileRatingApi.useGetRatingQuery;
export const useRateProfile = profileRatingApi.useRateProfileMutation;
