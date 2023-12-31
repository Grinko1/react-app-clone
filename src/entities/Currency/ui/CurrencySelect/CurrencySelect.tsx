import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Currency } from '../../model/types/currency';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(
  ({ className, value, onChange, readonly }: CurrencySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency);
      },
      [onChange],
    );

    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <HStack align='center' gap='8'>
            <span>{t('Укажите валюту')}</span>
            <ListBox
              className={classNames('', {}, [className])}
              items={options}
              value={value}
              onChange={onChangeHandler}
              readonly={readonly}
            />
          </HStack>
        }
        off={
          <HStack align='center' gap='8'>
            <span>{t('Укажите валюту')}</span>
            <ListBoxDeprecated
              className={classNames('', {}, [className])}
              items={options}
              value={value}
              onChange={onChangeHandler}
              readonly={readonly}
            />
          </HStack>
        }
      />
    );
  },
);
