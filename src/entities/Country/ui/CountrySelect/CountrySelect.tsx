import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { Country } from '../../model/types/country';
import { HStack } from 'shared/ui/Stack';
import { ListBox } from 'shared/ui/ListBox/ListBox';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo(
  ({ className, value, onChange, readonly }: CountrySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange],
    );

    return (
      <HStack align='center' gap='8'>
        <span>{t('Укажите страну')}</span>
        <ListBox
          className={classNames('', {}, [className])}
          items={options}
          value={value}
          onChange={onChangeHandler}
          readonly={readonly}
          direction='top'
        />
      </HStack>
      // <Select
      //     className={classNames('', {}, [className])}
      //     label={t('Укажите страну')}
      //     options={options}
      //     value={value}
      //     onChange={onChangeHandler}
      //     readonly={readonly}
      // />
    );
  },
);
