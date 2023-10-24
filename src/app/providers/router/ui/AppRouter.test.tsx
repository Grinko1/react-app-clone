import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import AppRouter from './AppRouter';
import {
  getRouteAbout,
  getRouteAdmin,
  getRouteForbidden,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';
import { screen } from '@testing-library/react';
import { UserRole } from '@/entities/User';

describe('app/router/AppRouter', () => {
  test('render page', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAbout(),
    });
    const page = await screen.findByTestId('AboutPage');
    expect(page).toBeInTheDocument();
  });
  test('not found page', async () => {
    componentRender(<AppRouter />, {
      route: '/dsfdfdsf',
    });
    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });
  test('Main page', async () => {
    componentRender(<AppRouter />, {
      route: getRouteMain(),
    });
    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  test('Profile page', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: { _inited: true, authData: {} },
      },
    });
    const page = await screen.findByTestId('ProfilePage');
    expect(page).toBeInTheDocument();
  });

  test(' Redirect from Profile to Main', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1'),
    });
    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  test('Forbidden page', async () => {
    componentRender(<AppRouter />, {
      route: getRouteForbidden(),
    });
    const page = await screen.findByTestId('ForbiddenPage');
    expect(page).toBeInTheDocument();
  });
  test('Redirect from Admin panel to Main (has no permition)', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
    });
    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });
  test('Admin panel  (has permition) ', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: { _inited: true, authData: { roles: [UserRole.ADMIN] } },
      },
    });
    const page = await screen.findByTestId('AdminPanelPage');
    expect(page).toBeInTheDocument();
  });
}); 
