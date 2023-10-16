import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ArticleRecommendationsList.module.scss';
import { memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleList, ArticleView } from 'entities/Article';
import { VStack } from 'shared/ui/Stack';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { useArticleRecommendationsList } from 'features/articleRecommendationsList/api/articleRecommendatinsApi';


interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const { isLoading, data: articles, error } = useArticleRecommendationsList(3);


  return (
    <VStack gap='8' className={classNames(cls.ArticleRecommendationsList, {}, [className])}>
      <Text size={TextSize.L} className={cls.commentTitle} title={t('Рекомендуем')} />

      {!isLoading && articles && (
        <ArticleList
          articles={articles}
          isLoading={false}
          className={cls.recommendations}
          target='_blank'
        />
      )}
    </VStack>
  );
});
