import { RootComponentInstance } from '@uniformdev/canvas';
import { getEnhancers } from '@uniformdev/canvas-enhancers';
import { contentfulEntriesPostEnhancer, contentfulEntryPostEnhancer } from './cmsPostEnhancers/contentfulPostEnhancer';
import { commercetoolsPostEnhancer } from './cmsPostEnhancers/commercetoolsPostEnhancer';

const postEnhancers = new Map();
// Contentful post enhancer
postEnhancers.set('Contentful Entry', contentfulEntryPostEnhancer);
postEnhancers.set('Contentful Multi', contentfulEntriesPostEnhancer);
postEnhancers.set('Contentful Query', contentfulEntriesPostEnhancer);

// Commercetools post enhancer
postEnhancers.set('Commercetools', commercetoolsPostEnhancer);

export const getBundledEnhancers = (composition: RootComponentInstance) => getEnhancers({ composition }, postEnhancers);
