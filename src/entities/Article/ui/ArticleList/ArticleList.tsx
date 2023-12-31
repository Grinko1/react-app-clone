import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import style from './ArticleList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Article } from '@/entities/Article/model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { ArticleView } from '@/entities/Article/model/consts/consts';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => <ArticleListItemSkeleton view={view} key={index} />);
};

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, isLoading, view = ArticleView.SMALL, target } = props;

  const { t } = useTranslation();
  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem
        key={article.id}
        article={article}
        view={view}
        className={style.ArticleList}
        target={target}
      />
    );
  };
  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(style.ArticleList, {}, [className, style[view]])}>
        <Text title={t('Статьи не найдены')} size={TextSize.L} />
      </div>
    );
  }
  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <HStack gap='16' wrap='wrap' className={classNames(style.ArticleListRedesigned, {},[] )}>
          {articles.length ? articles.map(renderArticle) : null}
          {isLoading && getSkeletons(view)}
        </HStack>
      }
      off={
        <div className={classNames(style.ArticleList, {}, [className, style[view]])}>
          {articles.length ? articles.map(renderArticle) : null}
          {isLoading && getSkeletons(view)}
        </div>
      }
    />
  );
});

//virtual scroll
// import { classNames } from 'shared/lib/classNames/classNames';
// import { useTranslation } from 'react-i18next';
// import { HTMLAttributeAnchorTarget, memo } from 'react';
// import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
// import { Text, TextSize } from 'shared/ui/Text/Text';
// import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
// import cls from './ArticleList.module.scss';
// import { Article, ArticleView } from '../../model/types/article';
// import { AutoSizer, List, ListRowProps, WindowScroller } from 'react-virtualized';
// import { PAGE_ID } from 'widgets/Page/Page';

// interface ArticleListProps {
//   className?: string;
//   articles: Article[];
//   isLoading?: boolean;
//   target?: HTMLAttributeAnchorTarget;
//   view?: ArticleView;
// }

// const getSkeletons = (view: ArticleView) =>
//   new Array(view === ArticleView.SMALL ? 9 : 3)
//     .fill(0)
//     .map((item, index) => <ArticleListItemSkeleton className={cls.card} key={index} view={view} />);

// export const ArticleList = memo((props: ArticleListProps) => {
//   const { className, articles, view = ArticleView.SMALL, isLoading, target } = props;
//   const { t } = useTranslation();

//   const renderArticle = (article: Article) => (
//     <ArticleListItem
//       article={article}
//       view={view}
//       className={cls.card}
//       key={article.id}
//       target={target}
//     />
//   );

//   const isBig = ArticleView.BIG === view;
//   const itemsPerRow = isBig ? 1 : 3;
//   const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);

//   const rowRender = ({ index, isScrolling, key, style }: ListRowProps) => {
//     const items = [];
//     const fromIndex = index + itemsPerRow;
//     const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);
//     for (let i = fromIndex; i < toIndex; i++) {
//       items.push(
//         <ArticleListItem
//           article={articles[i]}
//           view={view}
//           className={cls.card}
//           target={target}
//           key={'str' + i}
//         />,
//       );
//     }

//     return (
//       <div key={key} style={style} className={cls.row}>
//         {items}
//         {/* <ArticleListItem
//           article={articles[index]}
//           view={view}
//           className={cls.card}
//           target={target}
//         /> */}
//       </div>
//     );
//   };

//   if (!isLoading && !articles.length) {
//     return (
//       <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
//         <Text size={TextSize.L} title={t('Статьи не найдены')} />
//       </div>
//     );
//   }

//   return (
//     // <WindowScroller
//     //   onScroll={() => console.log('scroll')}
//     //   scrollElement={document.getElementById(PAGE_ID) as Element}>
//     //   {({ height, width, registerChild, isScrolling, onChildScroll, scrollTop }) => (
//     //     <div className={classNames(cls.ArticleList, {}, [className, cls[view]])} ref={registerChild}>
//     //       <List
//     //         autoHeight
//     //         height={height ?? 700}
//     //         rowCount={rowCount}
//     //         rowHeight={isBig ? 700 :330}
//     //         rowRenderer={rowRender}
//     //         width={width ? width -80 : 700}
//     //         onScroll={onChildScroll}
//     //         scrollTop={scrollTop}
//     //         isScrolling={isScrolling}
//     //       />
//     //       {isLoading && getSkeletons(view)}
//     //     </div>
//     //   )}
//     // </WindowScroller>
//     <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
//       {articles.length > 0 ? articles.map(renderArticle) : null}
//       {isLoading && getSkeletons(view)}
//     </div>
//   );
// });
