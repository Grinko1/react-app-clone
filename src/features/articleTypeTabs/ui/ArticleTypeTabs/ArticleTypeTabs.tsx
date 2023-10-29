import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Tabs as TabsDepricated } from '@/shared/ui/deprecated/Tabs/Tabs';
import { ArticleType } from '@/entities/Article/model/consts/consts';
import { ToggleFeatures } from '@/shared/lib/features';
import { TabItem, Tabs } from '@/shared/ui/redesigned/Tabs/Tabs';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const { t } = useTranslation();

  const typeTabs = useMemo<TabItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t('Все статьи'),
      },
      {
        value: ArticleType.IT,
        content: t('Айти'),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t('Экономика'),
      },
      {
        value: ArticleType.SCIENCE,
        content: t('Наука'),
      },
    ],
    [t],
  );

  const onTabClick = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType],
  );

  return (
    <ToggleFeatures
      feature='isAppRedisigned'
      on={
        <Tabs
          tabs={typeTabs}
          value={value}
          onTabClick={onTabClick}
          direction='column'
          className={classNames('', {}, [className])}
        />
      }
      off={
        <TabsDepricated
          tabs={typeTabs}
          value={value}
          onTabClick={onTabClick}
          className={classNames('', {}, [className])}
        />
      }
    />
  );
});
