import { ArticleList } from '@/entities/Article';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slices/articlesPageSlice';
import { memo } from 'react';
import { useSelector } from 'react-redux';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo(({ className }: ArticleInfiniteListProps) => {
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const error = useSelector(getArticlesPageError);

  return <ArticleList isLoading={isLoading} view={view} articles={articles} className='list' />;
});
