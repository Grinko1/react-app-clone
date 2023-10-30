import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';

import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import cls from './ArticleListItem.module.scss';
import { ArticleBlockType, ArticleView } from '@/entities/Article/model/consts/consts';
import { getRouterArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';
import { ArticleListItemProps } from '../ArticleListItem';
import { ArticleTextBlock } from '@/entities/Article/model/types/article';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { Button } from '@/shared/ui/redesigned/Button/Button';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();

  const types = <Text text={article.type.join(', ')} className={cls.types} />;
  const views = (
    <HStack gap='8' justify='center'>
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.views} />
    </HStack>
  );

  const userInfo = (
    <>
      <Avatar size={32} src={article.user?.avatar} />
      <Text text={article.user?.username} bold />
    </>
  );
  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <Card
        className={classNames(cls.ArticleListItem, {}, [className, cls[view], cls.card])}
        data-testid='ArticleListItem'
        padding='24'
        max>
        <VStack max gap='16'>
          <HStack max gap='16'>
            {userInfo}
            <Text text={article.createdAt} />
          </HStack>
          <Text title={article.title} className={cls.title} bold />
          <Text title={article.subtitle} className={cls.title} size='s' />
          <AppImage
            src={article.img}
            className={cls.img}
            alt={article.title}
            fallback={<Skeleton width={'100%'} height={250} />}
          />
          {textBlock.paragraphs && (
            <Text text={textBlock.paragraphs.slice(0, 2).join(' ')} className={cls.textBlock} />
          )}
          <HStack max justify='between'>
            <AppLink target={target} to={getRouterArticleDetails(article.id)}>
              <Button variant='outline'>{t('Читать далее...')}</Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>

        {/* {types} */}
      </Card>
    );
  }

  return (
    <AppLink
      target={target}
      to={getRouterArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
      <Card className={cls.card} border='round'>
        <AppImage
          src={article.img}
          className={cls.img}
          alt={article.title}
          fallback={<Skeleton width={'200'} height={200} />}
        />
        <VStack className={cls.info}>
          <Text text={article.title} className={cls.title} />
          <VStack gap='4' max className={cls.footer}>
            <HStack justify='between' max>
              <Text text={article.createdAt} className={cls.date} />
              {views}
            </HStack>
            <HStack gap='4'>{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
