import { FC } from 'react';
import { UniformSlot, ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import BaseSectionTwoColumns, { Props as BaseProps } from '../components/SectionTwoColumns';

type Props = ComponentProps<BaseProps>;

const SectionTwoColumns: FC<Props> = ({ columnWidths = '1/2 - 1/2', verticalAlignment, mobileItemsOrder }) => (
  <BaseSectionTwoColumns
    columnWidths={columnWidths}
    verticalAlignment={verticalAlignment}
    mobileItemsOrder={mobileItemsOrder}
    leftContent={<UniformSlot name="leftContent" emptyPlaceholder={<div className="h-96" />} />}
    rightContent={<UniformSlot name="rightContent" emptyPlaceholder={<div className="h-96" />} />}
  />
);

registerUniformComponent({
  type: 'sectionTwoColumns',
  component: SectionTwoColumns,
});

export default SectionTwoColumns;
