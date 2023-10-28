import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'ligth ';
export type CardPadding = '0' | '8' | '16' | '24';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  max?: boolean;
  withoutPaddings?: boolean;
  padding?:CardPadding
}

const mapPaddingToCLass:Record<CardPadding,string> = {
  '0':'gap_0',
  '8':'gap_8',
  '16':'gap_16',
  '24':'gap_24',
}
export const Card = memo((props: CardProps) => {
  const { className, children, max, variant = 'normal', padding='8', withoutPaddings, ...otherProps } = props;
const paddingClass = mapPaddingToCLass[padding]
  return (
    <div
      className={classNames(cls.Card, { [cls.max]: max }, [
        className,
        cls[variant],
        paddingClass
      ])}
      {...otherProps}>
      {children}
    </div>
  );
});
