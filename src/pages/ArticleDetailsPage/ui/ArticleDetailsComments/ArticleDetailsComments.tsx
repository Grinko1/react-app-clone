import { memo, useCallback } from 'react';
import cls from './ArticleDetailsComments.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import AddCommentForm from 'features/addCommentForm/ui/AddCommentForm/AddCommentForm';
import { CommentList } from 'entities/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { useTranslation } from 'react-i18next';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

interface ArticleDetailsCommentsProps {
  className?: string;
  id:string
}

export const ArticleDetailsComments = memo(({ className, id }: ArticleDetailsCommentsProps) => {

  const dispatch = useDispatch();
  const { t } = useTranslation('article-details');
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);


  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });
  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

  return (
    <div className={classNames(cls.ArticleDetailsComments, {}, [className])}>
      <Text size={TextSize.L} className={cls.commentTitle} title={t('Комментарии')} />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </div>
  );
});