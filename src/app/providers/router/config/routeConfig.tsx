import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { UserRole } from '@/entities/User';
import { AppRoutes, getRouteAbout, getRouteAdmin, getRouteArticleCreate, getRouteArticles, getRouteArticlesEdit, getRouteForbidden, getRouteMain, getRouteNotFound, getRouteProfile, getRouterArticleDetails } from '@/shared/const/router';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: getRouteAbout(),
    element: <AboutPage />,
  },
  [AppRoutes.FORBIDDEN_PAGE]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(':id'),
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLES]: {
    path: getRouteArticles(),
    element: <ArticlesPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_PANEL]: {
    path:  getRouteAdmin(),
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.ADMIN, UserRole.ADMIN],
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: getRouterArticleDetails(':id'),
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: getRouteArticleCreate(),
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: getRouteArticlesEdit(':id'),
    element: <ArticleEditPage />,
    authOnly: true,
  },
  // last
  [AppRoutes.NOT_FOUND]: {
    path: getRouteNotFound(),
    element: <NotFoundPage />,
  },
};
