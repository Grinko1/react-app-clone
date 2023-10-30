import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleRecommendationsList.module.scss';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useArticleRecommendationsList } from '@/features/articleRecommendationsList/api/articleRecommendatinsApi';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const { isLoading, data: articles, error } = useArticleRecommendationsList(3);

  return (
    <VStack gap="8" className={classNames(cls.ArticleRecommendationsList, {}, [className])}>
      <ToggleFeatures
      feature='isAppRedesigned'
      on={ <Text size='l' className={cls.commentTitle} title={t('Рекомендуем')} />}
      off={ <TextDeprecated size={TextSize.L} className={cls.commentTitle} title={t('Рекомендуем')} />}
      />
     

      {!isLoading && articles && (
        <ArticleList
          articles={articles}
          isLoading={false}
          className={cls.recommendations}
          target="_blank"
        />
      )}
    </VStack>
  );
});
