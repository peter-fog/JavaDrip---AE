import { EnhancerBuilder } from '@uniformdev/canvas';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { EnhanceParameter, getFormattedLink } from '../index';
import { articleRenderOptions } from './cmsPostEnhancers/contentfulPostEnhancer';

const projectMapLinkTransformer = ({
  parameter,
}: EnhanceParameter<{
  path: string;
  nodeId: string;
  projectMapId: string;
}>) => parameter.value.path;

const backgroundImageTransformer = ({ parameter }: EnhanceParameter<string>) => getFormattedLink(parameter.value);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jsonTransformer = ({ parameter }: EnhanceParameter<any>) => {
  if (parameter.value?.nodeType !== 'document') return parameter.value;
  return documentToHtmlString(parameter.value, articleRenderOptions);
};

export const extendEnhancerByCanvasComponents = (enhancer: EnhancerBuilder) => {
  enhancer
    .parameterType('link', { enhanceOne: projectMapLinkTransformer })
    .parameterType('image', {
      enhanceOne: backgroundImageTransformer,
    })
    .parameterType('json', { enhanceOne: jsonTransformer });
};
