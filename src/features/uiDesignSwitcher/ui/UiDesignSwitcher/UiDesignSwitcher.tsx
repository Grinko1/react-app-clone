import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ToggleFeatures, getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Text } from '@/shared/ui/deprecated/Text';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const isAppRedesigned = getFeatureFlag('isAppRedesigned');
  const authData = useSelector(getUserAuthData);

  const items = [
    { content: t('Новый'), value: 'new' },
    { content: t('Старый'), value: 'old' },
  ];

  const onChange = (value: string) => {
    if (authData) {
      dispatch(
        updateFeatureFlag({
          userId: authData?.id,
          newFeatures: {
            isAppRedesigned: value === 'new' ? true : false,
          },
        }),
      );
    }
  };
  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <ListBox
          value={isAppRedesigned ? 'new' : 'old'}
          label={t('Вариант интерфейса')}
          items={items}
          onChange={onChange}
          className={className}
        />
      }
      off={
        <HStack gap='8'>
          <Text title={t('Вариант интерфейса')} />
          <ListBoxDeprecated
            value={isAppRedesigned ? 'new' : 'old'}
            items={items}
            onChange={onChange}
            className={className}
          />
        </HStack>
      }
    />
  );
});
