import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';

import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon } from '../../../redesigned/Icon/Icon';
import { Icon as IconDerpecated } from '../../../deprecated/Icon/Icon';
import { ToggleFeatures } from '@/shared/lib/features';

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
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<Icon Svg={ThemeIcon} clickable onClick={onToggleTheme} />}
      off={
        <Button
          theme={ButtonTheme.CLEAR}
          className={classNames('', {}, [className])}
          onClick={onToggleTheme}>
          <IconDerpecated Svg={ThemeIconDeprecated} width={40} height={40} inverted />
        </Button>
      }
    />
  );
});
