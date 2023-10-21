export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBIDDEN_PAGE = 'forbidden_page',
  // last
  NOT_FOUND = 'not_found',
}
export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouterArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticlesEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
export const getRouteNotFound = () => '*';


 const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: getRouteMain(),
  [AppRoutes.ABOUT]: getRouteAbout(),
  [AppRoutes.PROFILE]: getRouteProfile(':id'), // + :id
  [AppRoutes.ARTICLES]: getRouteArticles(),
  [AppRoutes.ARTICLE_DETAILS]: getRouterArticleDetails(':id'), // + :id
  [AppRoutes.ARTICLE_CREATE]: getRouteArticleCreate(),
  [AppRoutes.ARTICLE_EDIT]: getRouteArticlesEdit(':id'),
  [AppRoutes.ADMIN_PANEL]: getRouteAdmin(),
  [AppRoutes.FORBIDDEN_PAGE]:getRouteForbidden(),
  // последний
  [AppRoutes.NOT_FOUND]: getRouteNotFound(),
};
