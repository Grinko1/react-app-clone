import { memo } from 'react';
import cls from './AppLogo.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../Stack';
// import Logo from '../../assets/imgs/Avatar.png'
import AppSvg from '@/shared/assets/icons/app-image.svg';

interface AppLogoProps {
  className?: string;
}

export const AppLogo = memo((props: AppLogoProps) => {
  const { className } = props;
  return (
    <HStack max justify='center' className={classNames(cls.appLogoWrapper, {}, [className])}>
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
      <AppSvg className={cls.appLogo} width={50} height={50} />
    </HStack>
  );
});
