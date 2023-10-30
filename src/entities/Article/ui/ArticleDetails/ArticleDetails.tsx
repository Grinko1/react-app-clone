import { memo } from 'react';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleDetailsRedesigned } from './ArticleDetailsRedesigned';
import { ArticleDetailsDeprecated } from './ArticleDetailsDeprecated';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<ArticleDetailsRedesigned {...props} />}
        off={<ArticleDetailsDeprecated {...props} />}
      />
    </DynamicModuleLoader>
  );
});
