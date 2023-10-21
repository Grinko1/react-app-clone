import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import style from './ForbiddenPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page/Page';

interface ForbiddenPageProps {
    className?: string;
}

export const ForbiddenPage = memo(({ className }: ForbiddenPageProps) => {
  const { t } = useTranslation();
  return (
    <Page className={classNames(style.ForbiddenPage, {}, [className])}>
      {t('У вас нет доступа')}
    </Page>
  );
});
