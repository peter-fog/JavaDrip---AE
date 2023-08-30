import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { useInstantSearch, Hits } from 'react-instantsearch-hooks-web';
import { InformationContent } from '../../components';
import { ProductItem } from '../../components';

const ProductHit = ({ hit }: { hit: Type.Product }) => <ProductItem product={hit} />;

const AlgoliaHits: FC<ComponentProps> = () => {
  const {
    results: { hits, processingTimeMS },
    status,
  } = useInstantSearch();

  const renderContent = () => {
    if (!hits.length && status === 'idle' && processingTimeMS) {
      return <InformationContent title="Sorry there are no products for this filter" />;
    }
    return (
      <Hits<Type.Product & Record<string, unknown>>
        hitComponent={ProductHit}
        classNames={{
          list: 'grid gap-y-3 mb-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8 sm:gap-y-6 lg:gap-x-8 lg:gap-y-5 sm:mb-0',
        }}
      />
    );
  };

  return <div className="pt-2 min-h-[500px]">{renderContent()}</div>;
};

registerUniformComponent({
  type: 'algolia-hits',
  component: AlgoliaHits,
});

export default AlgoliaHits;
