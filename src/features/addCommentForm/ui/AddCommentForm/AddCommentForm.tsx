import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slices/addCommentFormSlice';
import {
  getAddCommentFormError,
  getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import cls from './AddCommentForm.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card/Card';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch],
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <Card max border='round' padding='24'>
          <HStack gap='16' max className={classNames(cls.AddCommentFormRedesigne, {}, [className])}>
            <Input
              className={cls.input}
              placeholder={t('Введите текст комментария')}
              value={text}
              onChange={onCommentTextChange}
 
            />
            <Button variant='outline' onClick={onSendHandler}>
              {t('Отправить')}
            </Button>
          </HStack>
          </Card>
        }
        off={
          <div className={classNames(cls.AddCommentForm, {}, [className])}>
            <InputDeprecated
              className={cls.input}
              placeholder={t('Введите текст комментария')}
              value={text}
              onChange={onCommentTextChange}
            />
            <ButtonDeprecated theme={ButtonTheme.OUTLINE} onClick={onSendHandler}>
              {t('Отправить')}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
