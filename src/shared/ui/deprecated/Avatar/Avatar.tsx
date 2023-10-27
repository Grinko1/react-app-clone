import { CSSProperties, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage/AppImage';
import { Icon } from '../Icon/Icon';
import UserIcon from '@/shared/assets/icons/avatar.svg';
import { Skeleton } from '../Skeleton/Skeleton';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

export const Avatar = ({ className, src, size = 100, alt, fallbackInverted }: AvatarProps) => {
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size],
  );

  return (
    <AppImage
      src={src}
      alt={alt}
      style={styles}
      errorFallback={<Icon Svg={UserIcon} width={size} height={size} inverted={fallbackInverted} />}
      fallback={<Skeleton width={size} height={size} border={'50%'} />}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
};
