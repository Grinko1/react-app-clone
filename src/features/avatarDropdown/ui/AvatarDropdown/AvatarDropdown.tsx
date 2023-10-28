import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AvatarDropdown.module.scss';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;

  const { t } = useTranslation();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const authData = useSelector(getUserAuthData);

  const dispatch = useAppDispatch();

  const isAdminPanelAvaible = isAdmin || isManager;

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!authData) {
    return null;
  }
  const items = [
    ...(isAdminPanelAvaible
      ? [
          {
            content: t('Админ'),
            href: getRouteAdmin(),
          },
        ]
      : []),
    {
      content: t('Выйти'),
      onClick: onLogout,
    },
    {
      content: t('Профиль'),
      href: getRouteProfile(authData.id),
    },
  ];
  return (
    <ToggleFeatures
      feature='isAppRedisigned'
      on={
        <Dropdown
          className={classNames(cls.AvatarDropdown, {}, [className])}
          direction='bottom left'
          items={items}
          trigger={<Avatar size={40} src={authData.avatar} />}
        />
      }
      off={
        <DropdownDeprecated
          className={classNames(cls.AvatarDropdown, {}, [className])}
          direction='bottom left'
          items={items}
          trigger={<AvatarDeprecated  size={30} fallbackInverted src={authData.avatar} />}
        />
      }
    />
  );
});
