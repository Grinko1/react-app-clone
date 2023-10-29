import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Currency } from '@/entities/Currency/model/types/currency';
import { CurrencySelect } from '@/entities/Currency';
import { Country } from '@/entities/Country/model/types/country';
import { CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';


interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onChangeLastname?: (value?: string) => void;
  onChangeFirstname?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}


export const ProfileCardDeprecated = (props: ProfileCardProps) => {
    const {
    className,
    data,
    isLoading,
    error,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,
  } = props;
  const { t } = useTranslation('profile');

  if (isLoading) {
    return (
      <HStack
        justify='center'
        max
        className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
        <Loader />
      </HStack>
    );
  }
    if (error) {
    return (
         <HStack
            justify='center'
            max
            className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
            <TextDeprecated
              theme={TextTheme.ERROR}
              title={t('Произошла ошибка при загрузке профиля')}
              text={t('Попробуйте обновить страницу')}
              align={TextAlign.CENTER}
            />
          </HStack>
    );
  }
    const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
  <VStack gap='8' max className={classNames(cls.ProfileCard, mods, [className])}>
          {data?.avatar && (
            <HStack justify='center' max className={cls.avatarWrapper}>
              <AvatarDeprecated src={data?.avatar} />
            </HStack>
          )}
          <InputDeprecated
            value={data?.first}
            placeholder={t('Ваше имя')}
            className={cls.input}
            onChange={onChangeFirstname}
            readonly={readonly}
            data-testid='ProfileCard.firstname'
          />
          <InputDeprecated
            value={data?.lastname}
            placeholder={t('Ваша фамилия')}
            className={cls.input}
            onChange={onChangeLastname}
            readonly={readonly}
            data-testid='ProfileCard.lastname'
          />
          <InputDeprecated
            value={data?.age}
            placeholder={t('Ваш возраст')}
            className={cls.input}
            onChange={onChangeAge}
            readonly={readonly}
            data-testid='ProfileCard.age'
          />
          <InputDeprecated
            value={data?.city}
            placeholder={t('Город')}
            className={cls.input}
            onChange={onChangeCity}
            readonly={readonly}
            data-testid='ProfileCard.city'
          />
          <InputDeprecated
            value={data?.username}
            placeholder={t('Введите имя пользователя')}
            className={cls.input}
            onChange={onChangeUsername}
            readonly={readonly}
            data-testid='ProfileCard.username'
          />
          <InputDeprecated
            value={data?.avatar}
            placeholder={t('Введите ссылку на аватар')}
            className={cls.input}
            onChange={onChangeAvatar}
            readonly={readonly}
            data-testid='ProfileCard.avatar'
          />
          <CurrencySelect
            className={cls.input}
            value={data?.currency}
            onChange={onChangeCurrency}
            readonly={readonly}
          />
          <CountrySelect
            className={cls.input}
            value={data?.country}
            onChange={onChangeCountry}
            readonly={readonly}
          />
        </VStack>
  )

}

