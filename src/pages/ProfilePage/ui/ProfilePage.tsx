import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice';
import { ProfileRating } from '@/features/profileRating';

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams();
  const { t } = useTranslation('profile');

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames('', {}, [className])}  data-testid={'ProfilePage'}>
        <VStack gap="16" max>
          <EditableProfileCard id={id} />
          <ProfileRating profileId={id ?? ''} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
