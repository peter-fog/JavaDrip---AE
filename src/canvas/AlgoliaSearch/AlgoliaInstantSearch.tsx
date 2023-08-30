import { FC, useMemo } from 'react';
import getConfig from 'next/config';
import algoliasearch from 'algoliasearch/lite';
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web';
import { useScores } from '@uniformdev/context-react';
import { ComponentProps, UniformSlot, registerUniformComponent } from '@uniformdev/canvas-react';
import { fromCamelCase } from '@/utilities';
import { ErrorPropertyCallout } from '../../components';
import { Container } from '../../components';

const {
  publicRuntimeConfig: { algoliaApplicationId, algoliaSearchKey },
} = getConfig();

const searchClient = algoliasearch(algoliaApplicationId, algoliaSearchKey);

type Props = {
  title?: string;
  rootCategory?: string;
  instantSearchParams?: {
    instantSearchProps?: {
      indexName: string;
      stalledSearchDelay?: number;
    };
  };
};

const prefixScore = 'subCategory_';

const AlgoliaInstantSearch: FC<ComponentProps<Props>> = ({ instantSearchParams, rootCategory, component }) => {
  const scores = useScores();
  const { instantSearchProps } = instantSearchParams || {};

  // Optional filters: https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/in-depth/optional-filters/#filter-scoring
  const boostFacetFilters: string[] = useMemo(
    () =>
      Object.keys(scores)
        .filter(key => key.startsWith(prefixScore))
        .map(key => `subCategories:${fromCamelCase(key.replace(prefixScore, ''))}<score=${scores[key] || 0}>`),
    [scores]
  );

  if (!instantSearchProps) {
    return (
      <Container>
        <ErrorPropertyCallout
          classNames="sm:m-8 m-6"
          title={`Property 'indexName' was not defined for ${component.type} component.`}
        />
      </Container>
    );
  }

  return (
    <Container key={`algolia-search-${rootCategory}`}>
      <div className="py-6 sm:py-8">
        <InstantSearch {...instantSearchProps} searchClient={searchClient}>
          <Configure
            sumOrFiltersScores={true}
            facetFilters={[[...boostFacetFilters, `rootCategories:${rootCategory}`], `rootCategories:${rootCategory}`]}
          />
          <UniformSlot name="widgets" />
        </InstantSearch>
      </div>
    </Container>
  );
};

registerUniformComponent({
  type: 'algolia-instantSearch',
  component: AlgoliaInstantSearch,
});

export default AlgoliaInstantSearch;
