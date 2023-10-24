import { memo } from 'react';
import style from './AdminPanelPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page/Page';

interface AdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = memo(({ className }: AdminPanelPageProps) => {
  return (
    // eslint-disable-next-line i18next/no-literal-string
    <Page className={classNames(style.AdminPanelPage, {}, [className])}  data-testid={'AdminPanelPage'}>
      admin panel
    </Page>
  );
});

export default AdminPanelPage;
