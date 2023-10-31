/* eslint-disable i18next/no-literal-string */
import { AppRoutes } from '@/shared/const/router';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';
import { ScrollToolbar } from '@/widgets/ScrollToolbar/ScrollToolbar';
import { ReactElement } from 'react';

export function useAppToolbar() {
    const currentRoute = useRouteChange()
  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
    [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
    [AppRoutes.MAIN]: <div>main</div>,
    [AppRoutes.ABOUT]: <div>about</div>
  };
  return toolbarByAppRoute[currentRoute]
}
