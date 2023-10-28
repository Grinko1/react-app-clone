import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'ligth ';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'default'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  max?: boolean;
  withoutPaddings?: boolean;
  padding?: CardPadding;
  border?:CardBorder
}

const mapPaddingToCLass: Record<CardPadding, string> = {
  '0': 'gap_0',
  '8': 'gap_8',
  '16': 'gap_16',
  '24': 'gap_24',
};
export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    max,
    variant = 'normal',
    padding = '24',
    withoutPaddings,
    border='default',
    ...otherProps
  } = props;

  const paddingClass = mapPaddingToCLass[padding];
  return (
    <div
      className={classNames(cls.Card, { [cls.max]: max, [cls.withoutPaddings]: withoutPaddings }, [
        className,
        cls[variant],
        cls[paddingClass],
        cls[border]
      ])}
      {...otherProps}>
      {children}
    </div>
  );
});
