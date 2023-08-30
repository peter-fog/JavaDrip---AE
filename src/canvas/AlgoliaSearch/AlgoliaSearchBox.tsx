import { FC } from 'react';
import { SearchBox, useInstantSearch } from 'react-instantsearch-hooks-web';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { ErrorPropertyCallout } from '../../components';
import { Container } from '../../components';

type Props = {
  searchBoxParams?: {
    searchBoxProps?: {
      placeholder?: string;
      searchAsYouType?: boolean;
    };
  };
};

const AlgoliaSearchBox: FC<ComponentProps<Props>> = ({ searchBoxParams }) => {
  const { searchBoxProps } = searchBoxParams || {};

  const { error } = useInstantSearch();

  if (error) {
    return (
      <Container>
        <ErrorPropertyCallout title={error.name} text={error.message} classNames="sm:mx-8 mx-6" />
      </Container>
    );
  }

  return (
    <div className="mb-8">
      <SearchBox
        {...searchBoxProps}
        classNames={{
          input: 'py-2 px-8 bg-gray-50 placeholder:text-black w-full focus:border-black border-none outline-none',
          form: 'relative algolia-search-form',
          submit: 'absolute left-2 bottom-1/2 translate-y-1/2',
          submitIcon: 'w-3.5 h-3.5',
          resetIcon: 'w-3.5 h-3.5',
          reset: 'absolute right-3 bottom-1/2 translate-y-1/2',
          loadingIndicator: 'absolute right-3 bottom-1/2 translate-y-1/2',
        }}
      />
    </div>
  );
};

registerUniformComponent({
  type: 'algolia-searchBox',
  component: AlgoliaSearchBox,
});

export default AlgoliaSearchBox;
