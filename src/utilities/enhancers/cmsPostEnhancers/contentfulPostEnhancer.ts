import { Next, documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, NodeData } from '@contentful/rich-text-types';
import { EnhanceParameter, getFormattedLink } from '../../index';

export const articleRenderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: NodeData, next: Next) => `<p class="pb-10 text-lg">${next(node.content)}</p>`,
    [BLOCKS.HEADING_2]: (node: NodeData, next: Next) => `<h2 class="pb-2.5 text-2xl">${next(node.content)}</h2>`,
    [BLOCKS.EMBEDDED_ASSET]: (node: NodeData) =>
      `<div class="pb-12 lg:pb-16 max-w-4xl">
            <img src="${node.data.target.fields.file.url}" 
                    height="${node.data.target.fields.file.details.image.height}"
                    width="${node.data.target.fields.file.details.image.width}" alt="${node.data.target.fields.description}"/>
          </div>`,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapContentfulFields = (fields: Record<string, any>) => {
  for (const key in fields) {
    if (key === 'thumbnail') {
      fields[key] = getFormattedLink(fields[key]?.fields?.file?.url) || fields[key];
    }
    if (key === 'content' && fields[key]?.nodeType === 'document') {
      fields[key] = documentToHtmlString(fields[key], articleRenderOptions);
    }
  }
  return fields;
};

export const contentfulEntryPostEnhancer = ({ parameter }: EnhanceParameter<{ fields?: Record<string, unknown> }>) =>
  mapContentfulFields(parameter.value?.fields || {});

export const contentfulEntriesPostEnhancer = ({
  parameter,
}: EnhanceParameter<[{ fields?: Record<string, unknown> }]>) => {
  return parameter.value?.map(item => mapContentfulFields(item?.fields || {})) || [];
};
