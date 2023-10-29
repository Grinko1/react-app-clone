import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Currency } from '@/entities/Currency/model/types/currency';
import { CurrencySelect } from '@/entities/Currency';
import { Country } from '@/entities/Country/model/types/country';
import { CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';

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

export const ProfileCardRedesigned = (props: ProfileCardProps) => {
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
      <Card padding='24' max>
        <VStack gap='32'>
          <HStack max justify='center'>
            <Skeleton border='100%' width={128} height={128} />
          </HStack>
          <HStack gap='32' max>
            <VStack gap='16' max>
              <Skeleton width='100%' height={38} border='20px' />
              <Skeleton width='100%' height={38} border='20px' />
              <Skeleton width='100%' height={38} border='20px' />
              <Skeleton width='100%' height={38} border='20px' />
            </VStack>

            <VStack gap='16' max>
              <Skeleton width='100%' height={38} border='20px' />
              <Skeleton width='100%' height={38} border='20px' />
              <Skeleton width='100%' height={38} border='20px' />
              <Skeleton width='100%' height={38} border='20px' />
            </VStack>
          </HStack>
        </VStack>
      </Card>
    );
  }

  if (error) {
    return (
      <HStack
        justify='center'
        max
        className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          variant='error'
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align='center'
        />
      </HStack>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <Card max className={classNames(cls.ProfileCardRedesigned, {}, [className])}>
      <VStack gap='32'>
        {data?.avatar && (
          <HStack justify='center' max className={cls.avatarWrapper}>
            <Avatar src={data?.avatar} size={120} />
          </HStack>
        )}
        <HStack gap='24' max>
          <VStack gap='16' max>
            <Input
              value={data?.first}
              label={t('Имя')}
              className={cls.input}
              onChange={onChangeFirstname}
              readonly={readonly}
              data-testid='ProfileCard.firstname'
            />
            <Input
              value={data?.lastname}
              label={t('Фамилия')}
              className={cls.input}
              onChange={onChangeLastname}
              readonly={readonly}
              data-testid='ProfileCard.lastname'
            />
            <Input
              value={data?.age}
              label={t('Возраст')}
              className={cls.input}
              onChange={onChangeAge}
              readonly={readonly}
              data-testid='ProfileCard.age'
            />
            <Input
              value={data?.city}
              label={t('Город')}
              className={cls.input}
              onChange={onChangeCity}
              readonly={readonly}
              data-testid='ProfileCard.city'
            />
          </VStack>
          <VStack max gap='16'>
            <Input
              value={data?.username}
              label={t('Имя пользователя')}
              className={cls.input}
              onChange={onChangeUsername}
              readonly={readonly}
              data-testid='ProfileCard.username'
            />
            <Input
              value={data?.avatar}
              label={t('Ссылка на аватар')}
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
        </HStack>
      </VStack>
    </Card>
  );
};
