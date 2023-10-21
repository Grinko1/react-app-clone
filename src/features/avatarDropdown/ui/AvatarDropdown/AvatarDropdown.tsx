import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AvatarDropdown.module.scss';
import { Dropdown } from '@/shared/ui/Popups';
import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { RoutePath } from '@/shared/const/router';

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
  return (
    <Dropdown
      className={classNames(cls.AvatarDropdown, {}, [className])}
      direction="bottom left"
      items={[
        ...(isAdminPanelAvaible
          ? [
            {
              content: t('Админ'),
              href: RoutePath.admin_panel,
            },
          ]
          : []),
        {
          content: t('Выйти'),
          onClick: onLogout,
        },
        {
          content: t('Профиль'),
          href: RoutePath.profile + authData.id,
        },
      ]}
      trigger={<Avatar size={30} src={authData.avatar} />}
    />
  );
});
