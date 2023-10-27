import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Rating } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { useGetProfileRating, useRateProfile } from '../../api/profileRatingApi';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';

interface ProfileRatingProps {
  className?: string;
  profileId:string
}

export const ProfileRating = memo((props: ProfileRatingProps) => {
  const { className, profileId = '' } = props;
  const { t } = useTranslation('profile');

  const authData = useSelector(getUserAuthData);
  const [rateProfileMutation] = useRateProfile();
  const { data, isLoading } = useGetProfileRating({
    profileId,
    userId: authData?.id || '',
  });
  const rating = data?.[0];

  const handleRateArticle = useCallback(
    (starCount: number, feedback?: string) => {
      try {
        rateProfileMutation({
          userId: authData?.id ?? '',
          profileId,
          rate: starCount,
          feedback,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [authData?.id, profileId, rateProfileMutation],
  );

  const onAccept = useCallback(
    (starCount: number, feedback?: string) => {
      handleRateArticle(starCount, feedback);
    },
    [handleRateArticle],
  );
  const onCancel = useCallback(
    (starCount: number) => {
      handleRateArticle(starCount);
    },
    [handleRateArticle],
  );

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  return (
    <Rating
      className={className}
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      title={t('Оцените профиль')}
      feedbackTitle={t('Оставьте отзыв о профиле, это поможет улучшить качество')}
      hasFeedback
    />
  );
});
