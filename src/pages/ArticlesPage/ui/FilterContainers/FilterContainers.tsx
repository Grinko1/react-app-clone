import { ArticleFilters } from '@/widgets/ArticleFilters';
import { memo } from 'react';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FilterContainersProps {
  className?: string;
}

export const FilterContainers = memo((props: FilterContainersProps) => {
  const { className } = props;
  const {
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    onChangeView,
    search,
    sort,
    view,
    order,
    type,
  } = useArticleFilters();
  return (
    <ArticleFilters
      search={search}
      sort={sort}
      order={order}
      type={type}
      className={className}
      onChangeOrder={onChangeOrder}
      onChangeSearch={onChangeSearch}
      onChangeSort={onChangeSort}
      onChangeType={onChangeType}
    />
  );
});
