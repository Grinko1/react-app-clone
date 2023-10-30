import { getArticleDetailsData } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { memo, useCallback } from 'react';
import cls from './AdditionalInfoContainer.module.scss';
import { useSelector } from 'react-redux';
import { getRouteArticlesEdit } from '@/shared/const/router';
import { useNavigate } from 'react-router-dom';
import { getArticleDetailsIsLoading } from '@/entities/Article/model/selectors/articleDetails';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(getArticleDetailsData);
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    navigate(getRouteArticlesEdit(article?.id || ''));
  }, [article?.id, navigate]);

  if (!article) {
    return null;
  }
  if (isLoading) {
    return (
      <Card className={cls.card} padding='24' border='round' max>
         <VStack gap='16'>
        <HStack gap='8'>
          <Skeleton width={32} height={32} border='50%' />
          <Skeleton  width={100} height={20}/>
          <Skeleton width={70} height={20} />
        </HStack>
        <Skeleton height={30} width={150} border='20px'/>
        <Skeleton width={70} height={20} />
        </VStack>
      </Card>
    );
  }
  return (
    <Card className={cls.card} padding='24' border='round' max>
      <ArticleAdditionalInfo
        author={article?.user}
        views={article.views}
        createdAt={article.createdAt}
        onEdit={onEditArticle}
      />
    </Card>
  );
});
