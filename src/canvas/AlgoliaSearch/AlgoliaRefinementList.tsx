import { FC } from 'react';
import { RefinementList } from 'react-instantsearch-hooks-web';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { ErrorPropertyCallout } from '../../components';

type Props = {
  refinementListParams?: {
    refinementListProps?: {
      allowedIndex?: string;
      attribute: string;
      operator: 'and' | 'or';
      limit?: number;
      showMore?: boolean;
      showMoreLimit?: number;
      searchable?: boolean;
      searchablePlaceholder?: string;
      escapeFacetValues?: boolean;
    };
  };
};

// To remove prefixes in the facet name
const REGEX_PREFIX = /^(sub|root)/g;

const AlgoliaRefinementList: FC<ComponentProps<Props>> = ({ refinementListParams, component }) => {
  const { refinementListProps } = refinementListParams || {};

  if (!refinementListProps) {
    return (
      <ErrorPropertyCallout
        classNames="lg:mr-6 mt-2"
        title={`Property 'attribute' was not defined for ${component.type} component.`}
      />
    );
  }

  // allowedIndex attribute is absent in the RefinementList properties of the Algolia component.
  // To avoid warnings in the console, form only necessary properties
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { allowedIndex, ...algoliaRefinementListProps } = refinementListProps;

  return (
    <div className="w-full flex justify-center">
      <div className="pt-12 pr-10 inline-flex flex-col lg:w-full first:pt-2 min-h-[250px]">
        <span className="font-extrabold text-lg capitalize">
          {refinementListProps?.attribute?.replace(REGEX_PREFIX, '')}
        </span>
        <RefinementList
          {...algoliaRefinementListProps}
          classNames={{
            item: 'mt-4 px-2 hover:opacity-30',
            checkbox: 'hidden',
            selectedItem: 'rounded whitespace-nowrap py-1.5 px-2 hover:opacity-30 text-white bg-black my-1',
            showMore: 'border-2 uppercase font-bold text-sm text-center px-8 py-2.5 my-2 hover:border-black',
            disabledShowMore: 'pointer-events-none opacity-60',
            label: 'cursor-pointer flex justify-between items-center pr-3',
            labelText: 'capitalize pr-4 flex-1',
            count: 'bg-gray-50 rounded-full px-2 text-black',
          }}
        />
      </div>
    </div>
  );
};

registerUniformComponent({
  type: 'algolia-refinementList',
  component: AlgoliaRefinementList,
});

export default AlgoliaRefinementList;
