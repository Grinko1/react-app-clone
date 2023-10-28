import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../../model/types/notification';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card/Card';
import { Text as TextDepricated } from '@/shared/ui/deprecated/Text/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Text } from '@/shared/ui/redesigned/Text';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}


//135 end
export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, item } = props;
  const { t } = useTranslation();

  const content = (
    <ToggleFeatures
      feature='isAppRedisigned'
      on={
        <Card
          className={classNames(cls.NotificationItem, {}, [className])}>
          <Text  title={item.title} text={item.description} size='s' />
        </Card>
      }
      off={
        <CardDeprecated
          theme={CardTheme.OUTLINED}
          className={classNames(cls.NotificationItem, {}, [className])}>
          <TextDepricated title={item.title} text={item.description} />
        </CardDeprecated>
      }
    />
  );
  if (item.href) {
    return (
      <a href={item.href} target='_blank' className={cls.href} rel='noreferrer'>
        {content}
      </a>
    );
  }
  return content;
});
