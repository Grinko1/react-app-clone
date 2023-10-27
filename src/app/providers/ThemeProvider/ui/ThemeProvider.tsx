import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { Theme, ThemeContext } from '../lib/ThemeContext';

import { useJsonSettings } from '@/entities/User/model/selectors/getJsonSettings/getJsonSettings';

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const { initialTheme, children } = props;
  const defaultTheme = useJsonSettings().theme || Theme.LIGHT;
  const [isThemeInites, setIsThemeInited] = useState(false);

  const [theme, setTheme] = useState<Theme>(defaultTheme || initialTheme);

  useEffect(() => {
    if (!isThemeInites) {
      setTheme(defaultTheme);
      setIsThemeInited(true);
    }
  }, [defaultTheme, isThemeInites]);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
