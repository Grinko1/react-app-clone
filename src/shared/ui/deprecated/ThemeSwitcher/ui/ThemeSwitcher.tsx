import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import ThemeIcon from '@/shared/assets/icons/theme-light.svg';

import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon } from '../../Icon/Icon';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();

  const dispatch = useAppDispatch();
  const onToggleTheme = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [toggleTheme, dispatch]);

  return (
    <Button
      theme={ButtonTheme.CLEAR}
      className={classNames('', {}, [className])}
      onClick={onToggleTheme}>
     {/* <ThemeIcon /> */}
     <Icon Svg={ThemeIcon} width={40} height={40} inverted/>
    </Button>
  );
});
