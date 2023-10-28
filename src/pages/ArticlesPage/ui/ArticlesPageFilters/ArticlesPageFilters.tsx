import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import cls from './ArticlesPageFilters.module.scss';
import { ArticleSortSelector } from '@/features/articleSortSelector';
import { ArticleViewSelector } from '@/features/articleViewSelector';
import { ArticleTypeTabs } from '@/features/articleTypeTabs';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation();
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
    type
  } = useArticleFilters();

  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input onChange={onChangeSearch} value={search} placeholder={t('Поиск')} />
      </Card>
      <ArticleTypeTabs value={type} onChangeType={onChangeType} className={cls.tabs} />
    </div>
  );
});
