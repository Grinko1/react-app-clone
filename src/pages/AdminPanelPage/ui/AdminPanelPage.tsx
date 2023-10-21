import { memo } from 'react';
import style from './AdminPanelPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page/Page';

interface AdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = memo(({ className }: AdminPanelPageProps) => {
  return (
    <Page className={classNames(style.AdminPanelPage, {}, [className])}>
      admin panel
    </Page>
  );
});

export default AdminPanelPage;
