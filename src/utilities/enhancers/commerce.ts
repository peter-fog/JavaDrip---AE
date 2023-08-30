import { ChildEnhancerBuilder, EnhancerBuilder } from '@uniformdev/canvas';
import { EnhanceParameter } from '@/utilities';

interface AlgoliaRecommendParam {
  recommendOptions?: {
    objectId: string;
  };
}

// We replacing the default AlgoliaRecommend parameter enhancer with our own based on the product id from slug
const getAlgoliaRecommendedParameterPreEnhancer = (objectId: string) => ({
  enhanceOne: async function Enhancer({ parameter }: EnhanceParameter<AlgoliaRecommendParam>) {
    return {
      ...parameter.value,
      recommendOptions: {
        ...parameter.value?.recommendOptions,
        objectId,
      },
    };
  },
});

// We replacing the default AlgoliaRecord parameter enhancer with our own based on the product id from slug
const getAlgoliaProductParameterPreEnhancer = (objectId: string) => ({
  enhanceOne: async function Enhancer({ parameter }: EnhanceParameter<AlgoliaRecommendParam>) {
    return {
      ...parameter.value,
      objectIDs: [objectId],
    };
  },
});

const getProductComponentParameterEnhancer = (product: Type.Product) => (builder: ChildEnhancerBuilder) => {
  builder.data('product', () => product);
};

export const enhancerCustomExtenderFactory = (product: Type.Product) => (enhancer: EnhancerBuilder) => {
  enhancer.component(
    ['productInfo', 'productImageGallery', 'productDescription', 'addToCart'],
    getProductComponentParameterEnhancer(product)
  );
};

export const getPreEnhancer = (objectId: string) => {
  return new EnhancerBuilder()
    .parameterType('algolia-recommend', getAlgoliaRecommendedParameterPreEnhancer(objectId))
    .parameterType('algolia-record', getAlgoliaProductParameterPreEnhancer(objectId));
};
