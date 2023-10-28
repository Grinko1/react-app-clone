import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationButton.module.scss';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { NotificationList } from '@/entities/Notification';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);
  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <ToggleFeatures
      feature='isAppRedisigned'
      on={<Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />}
      off={
        <ButtonDeprecated theme={ButtonTheme.CLEAR} onClick={onOpenDrawer}>
          <IconDeprecated Svg={NotificationIcon} inverted />
        </ButtonDeprecated>
      }
    />
  );
  return (
    <div>
      <BrowserView>
        <ToggleFeatures
          feature='isAppRedisigned'
          on={
            <Popover
              className={classNames(cls.NotificationButton, {}, [className])}
              direction='bottom left'
              trigger={trigger}>
              <NotificationList className={cls.notifications} />
            </Popover>
          }
          off={
            <PopoverDeprecated
              className={classNames(cls.NotificationButton, {}, [className])}
              direction='bottom left'
              trigger={trigger}>
              <NotificationList className={cls.notifications} />
            </PopoverDeprecated>
          }
        />
      </BrowserView>
      <MobileView>
        {trigger}

        <Drawer onClose={onCloseDrawer} isOpen={isOpen}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  );
});
