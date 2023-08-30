import { FC } from 'react';
import { ComponentProps, registerUniformComponent, UniformText } from '@uniformdev/canvas-react';
import { BackgroundTypes } from '../components/Container';
import ProductItem from '../components/ProductItem';
import CarouselBlock from '../components/CarouselBlock';

type FeaturedProductsProps = ComponentProps<{
  title: string;
  subTitle?: string;
  products: Type.Product[];
  buttonCopy: string;
  buttonLink?: string;
  showAddToCart: boolean;
}>;

const FeaturedProducts: FC<FeaturedProductsProps> = ({
  title,
  subTitle,
  products,
  buttonCopy,
  buttonLink,
  showAddToCart,
  component,
}) => {
  const isDark = component.variant === BackgroundTypes.Dark.toLowerCase();

  if (!products?.length) return null;

  return (
    <CarouselBlock title={title} subTitle={subTitle} buttonCopy={buttonCopy} buttonLink={buttonLink} isDark={isDark}>
      {products.map(item => (
        <ProductItem key={`featured-product-${item.id}`} product={item} showAddToCart={showAddToCart} isDark={isDark} />
      ))}
    </CarouselBlock>
  );
};

['dark', undefined].forEach(variantId =>
  registerUniformComponent({
    type: 'featuredProducts',
    component: FeaturedProducts,
    variantId,
  })
);

['dark', undefined].forEach(variantId =>
  registerUniformComponent({
    type: 'recommendedProducts',
    component: FeaturedProducts,
    variantId,
  })
);

export default FeaturedProducts;
