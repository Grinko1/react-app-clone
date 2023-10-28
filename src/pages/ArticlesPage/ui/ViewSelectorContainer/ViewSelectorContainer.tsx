import { ArticleViewSelector } from '@/features/articleViewSelector';
import { useArticleFilters } from '@/shared/lib/hooks/useArticleFilters/useArticleFilters';
import { memo } from 'react';


interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo(
    (props: ViewSelectorContainerProps) => {
        const { className } = props;
        const { view, onChangeView } = useArticleFilters();

        return (
            <ArticleViewSelector
                className={className}
                view={view}
                onViewClick={onChangeView}
            />
        );
    },
);
