import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import cls from './ArticleDetails.module.scss';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { StickyContentLayout } from '@/shared/ui/redesigned/Layouts/StickyLayout/StickyLayout';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { renderBlock } from './renderBlock';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

export const ArticleDetailsRedesigned = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <StickyContentLayout
        content={
          <VStack gap='16' max>
            <Skeleton className={cls.title} width={300} height={32} />
            <Skeleton className={cls.title} width={300} height={32} />
            <Skeleton className={cls.avatar} width={'100%'} height={420} />

            <Skeleton className={cls.skeleton} width={600} height={24} />
            <Skeleton className={cls.skeleton} width='100%' height={200} />
            <Skeleton className={cls.skeleton} width='100%' height={200} />
          </VStack>
        }
      />
    );
  } else if (error) {
    content = <Text align='center' title={t('Произошла ошибка при загрузке статьи.')} />;
  } else {
    content = (
      <>
        <Text className={cls.title} title={article?.title} size='l' bold />
        <Text className={cls.title} text={article?.subtitle} />
        <AppImage fallback={<Skeleton />} src={article?.img} width={'100%'} height={420} />
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return <div className={classNames(cls.ArticleDetailsRedesigned, {}, [className])}>{content}</div>;
});
