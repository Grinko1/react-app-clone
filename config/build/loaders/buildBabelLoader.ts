import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface buildBabelLoaderProps extends BuildOptions {
  isTsx?: boolean;
}
export function buildBabelLoader({ isDev, isTsx }: buildBabelLoaderProps) {
  const isProd = !isDev

  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js||ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        casheDirectory:true,
        presets: ['@babel/preset-env'],
        plugins: [
          [
            {
              locales: ['ru', 'en'],
              keyAsDefaultValue: true,
            },
          ],
          [
            '@babel/plugin-transform-typescript',
            {
              isTsx,
            },
          ],
          '@babel/plugin-transform-runtime',
          isTsx && isProd && [
            babelRemovePropsPlugin,
            {
              props: ['data-testid'],
            },
          ],
          isDev && require.resolve('react-refresh/babel'),
        ].filter(Boolean),
      },
    },
  };
}
