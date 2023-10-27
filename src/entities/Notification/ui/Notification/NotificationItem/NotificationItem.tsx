import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../../model/types/notification';
import { Card, CardTheme } from '@/shared/ui/deprecated/Card/Card';
import { Text } from '@/shared/ui/deprecated/Text/Text';

interface NotificationItemProps {
    className?: string;
    item:Notification
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, item } = props;
  const { t } = useTranslation();

  const content = (
    <Card theme={CardTheme.OUTLINED} className={classNames(cls.NotificationItem, {}, [className])}>
      <Text title={item.title} text={item.description} />
    </Card>
  );
  if (item.href) {
    return (<a href={item.href} target="_blank" className={cls.href} rel="noreferrer">{content}</a>);
  }
  return content;
});
