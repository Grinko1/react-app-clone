import { memo } from 'react';
import cls from './ScrollToolbar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ScrollToTopButton } from '@/features/scrollToTopButton';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ScrollToolbarProps {
  className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
  const { className } = props;
  return (
    <VStack
      justify='center'
      align='center'
      className={classNames(cls.ScrollToolbar, {}, [className])}>
      <ScrollToTopButton />
    </VStack>
  );
});
