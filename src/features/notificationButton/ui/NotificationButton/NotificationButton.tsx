import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './NotificationButton.module.scss';
import { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Popover } from '@/shared/ui/Popups';
import { Icon } from '@/shared/ui/Icon/Icon';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { NotificationList } from '@/entities/Notification';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { BrowserView, MobileView } from 'react-device-detect';
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, [isOpen]);
  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, [isOpen ]);

  const trigger = (
    <Button theme={ButtonTheme.CLEAR} onClick={onOpenDrawer}>
      <Icon Svg={NotificationIcon} inverted />
    </Button>
  );
  return (
    <div>
      <BrowserView>
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          direction={'bottom left'}
          trigger={trigger}>
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <AnimationProvider>
        <Drawer onClose={onCloseDrawer} isOpen={isOpen}>
          <NotificationList />
        </Drawer>
        </AnimationProvider>
      </MobileView>
    </div>
  );
});
