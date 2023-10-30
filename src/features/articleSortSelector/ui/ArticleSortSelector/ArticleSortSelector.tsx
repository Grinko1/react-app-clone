import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select/Select';
import { SortOrder } from '@/shared/types/sort';
import cls from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '@/entities/Article/model/consts/consts';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, onChangeOrder, onChangeSort, order, sort } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('возрастанию'),
      },
      {
        value: 'desc',
        content: t('убыванию'),
      },
    ],
    [t],
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t('дате создания'),
      },
      {
        value: ArticleSortField.TITLE,
        content: t('названию'),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('просмотрам'),
      },
    ],
    [t],
  );

  const changeSortHandler = useCallback(
    (newSort: ArticleSortField) => {
      onChangeSort(newSort);
    },
    [onChangeSort],
  );

  const changeOrderHandler = useCallback(
    (newOrder: SortOrder) => {
      onChangeOrder(newOrder);
    },
    [onChangeOrder],
  );

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <div className={classNames(cls.ArticleSortSelectorRedesigned, {}, [className])}>
          <VStack gap='8' align='start'>
            <Text text={t('Сортировать по:')} />
            <ListBox
              items={sortFieldOptions}
              value={sort}
              onChange={changeSortHandler}
            />
            <ListBox
              items={orderOptions}
              value={order}
              onChange={changeOrderHandler}
              className={cls.order}
            />
          </VStack>
        </div>
      }
      off={
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
          <Select<ArticleSortField>
            options={sortFieldOptions}
            label={t('Сортировать ПО')}
            value={sort}
            onChange={changeSortHandler}
          />
          <Select
            options={orderOptions}
            label={t('по')}
            value={order}
            onChange={changeOrderHandler}
            className={cls.order}
          />
        </div>
      }
    />
  );
});
