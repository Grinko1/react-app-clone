import { memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?:FlexDirection
}

export const Tabs = memo((props: TabsProps) => {
  const {
    className, tabs, onTabClick, value,direction='row'
  } = props;

  const clickHandle = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <Flex direction={direction} gap='8' align='start' className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          variant={tab.value === value ? 'ligth' : 'normal'}
          className={cls.tab}
          key={tab.value}
          onClick={clickHandle(tab)}
          border='round'
          padding='16'
        >
          {tab.content}
        </Card>
      ))}
    </Flex>
  );
});
