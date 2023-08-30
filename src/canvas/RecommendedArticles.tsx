import { FC } from 'react';
import { ComponentProps, registerUniformComponent, UniformText } from '@uniformdev/canvas-react';
import CarouselBlock from '../components/CarouselBlock';
import ArticleItem from '../components/ArticleItem';
import { BackgroundTypes } from '../components/Container';

type RecommendedArticlesProps = ComponentProps<{
  title: string;
  subTitle?: string;
  articles: Type.Article[];
  buttonCopy?: string;
  buttonLink?: string;
}>;

const RecommendedArticles: FC<RecommendedArticlesProps> = ({
  title,
  subTitle,
  articles,
  buttonCopy,
  buttonLink,
  component,
}) => {
  const isDark = component.variant === BackgroundTypes.Dark.toLowerCase();

  if (!articles?.length) return null;

  return (
    <CarouselBlock title={title} subTitle={subTitle} buttonCopy={buttonCopy} buttonLink={buttonLink} isDark={isDark}>
      {articles.map(item => (
        <ArticleItem key={`article-${item.id}`} article={item} />
      ))}
    </CarouselBlock>
  );
};

['dark', undefined].forEach(variantId =>
  registerUniformComponent({
    type: 'recommendedArticles',
    component: RecommendedArticles,
    variantId,
  })
);

export default RecommendedArticles;
