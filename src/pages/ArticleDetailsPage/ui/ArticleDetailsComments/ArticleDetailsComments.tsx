import { Suspense, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cls from './ArticleDetailsComments.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text/Text';
import AddCommentForm from '@/features/addCommentForm/ui/AddCommentForm/AddCommentForm';
import { CommentList } from '@/entities/Comment';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from 
'@/pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleDetailsCommentsProps {
  className?: string;
  id: string;
}

export const ArticleDetailsComments = memo(({ className, id }: ArticleDetailsCommentsProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('article-details');
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

  useInitialEffect(() => {
    //@ts-ignore
    dispatch(fetchCommentsByArticleId(id));
  });
  const onSendComment = useCallback(
    (text: string) => {
      //@ts-ignore
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

  return (
    <div className={classNames(cls.ArticleDetailsComments, {}, [className])}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<Text size='l' className={cls.commentTitle} title={t('Комментарии')} />}
        off={
          <TextDeprecated size={TextSize.L} className={cls.commentTitle} title={t('Комментарии')} />
        }
      />

      <Suspense fallback={<Loader />}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>

      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </div>
  );
});
