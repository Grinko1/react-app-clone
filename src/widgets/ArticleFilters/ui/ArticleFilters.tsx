import { memo } from 'react';
import cls from './ArticleFilters.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { ArticleSortSelector } from '@/features/articleSortSelector';

import { ArticleTypeTabs } from '@/features/articleTypeTabs';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useTranslation } from 'react-i18next';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { Input } from '@/shared/ui/redesigned/Input/Input';

interface ArticleFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  type: ArticleType;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleFilters = memo((props: ArticleFiltersProps) => {
  const {
    className,
    onChangeType,
    onChangeSearch,
    search,
    onChangeSort,
    sort,
    onChangeOrder,
    order,
    type,
  } = props;
  const { t } = useTranslation();
  return (
    <Card className={classNames(cls.ArticleFilters, {}, [className])} padding='24'>
      <VStack gap='32'>
        <Input onChange={onChangeSearch} value={search} placeholder={t('Поиск')} />
        <ArticleTypeTabs value={type} onChangeType={onChangeType} className={cls.tabs} />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});
