import { Currency } from '@/entities/Currency/model/types/currency';
import { Country } from '@/entities/Country/model/types/country';
import { Profile } from '../../model/types/profile';
import { ToggleFeatures } from '@/shared/lib/features';
import { ProfileCardDeprecated } from '../ProfileCardDeprecated/ProfileCardDeprecated';
import { ProfileCardRedesigned } from '../ProfileCardRedesigned/ProfileCardRedesigned';

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

export const ProfileCard = (props: ProfileCardProps) => {
  return (
    <ToggleFeatures
      feature='isAppRedisigned'
      on={<ProfileCardRedesigned {...props} />}
      off={<ProfileCardDeprecated {...props} />}
    />
  );
};
