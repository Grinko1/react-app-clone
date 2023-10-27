import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Rating } from '@/entities/Rating';
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);
  const [rateArticleMutation] = useRateArticle();
  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: authData?.id || '',
  });
  const rating = data?.[0];

  const handleRateArticle = useCallback(
    (starCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: authData?.id ?? '',
          articleId,
          rate: starCount,
          feedback,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [authData?.id, articleId, rateArticleMutation],
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
      title={t('Оцените статью')}
      feedbackTitle={t('Оставьте отзыв о статье, это поможет улучшить качество')}
      hasFeedback
    />
  );
});

export default ArticleRating;
