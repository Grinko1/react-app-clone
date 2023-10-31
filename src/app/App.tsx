import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/shared/ui/deprecated/PageLoader/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/ui/redesigned/Layouts/MainLayout/MainLayout';
import { AppLoaderLayout } from '@/shared/ui/redesigned/Layouts/AppLoaderLayout/AppLoaderLayout';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);


  if (!inited) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <div className={classNames('app_redesigned', {}, [theme])}>
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <div id='app' className={classNames('app_redesigned', {}, [theme])}>
          <Suspense fallback=''>
            <MainLayout
              content={<AppRouter />}
              header={<Navbar />}
              sidebar={<Sidebar />}
              toolbar={<>...</>}
            />
          </Suspense>
        </div>
      }
      off={
        <div id='app' className={classNames('app', {}, [theme])}>
          <Suspense fallback=''>
            <Navbar />
            <div className='content-page'>
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
    />
  );
}

export default App;
