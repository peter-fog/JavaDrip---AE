import { GetStaticProps, GetStaticPaths } from 'next';
import {
  ALGOLIA_QUERY_PARAMETER_TYPE,
  CONTENTFUL_ENTRY_QUERY_PARAMETER_TYPE,
  CONTENTFUL_ENTRY_MULTI_PARAMETER_TYPE,
  CONTENTSTACK_ENTRY_QUERY_PARAMETER_TYPE,
  CONTENTSTACK_ENTRY_MULTI_PARAMETER_TYPE,
} from '@uniformdev/canvas-enhancers';
import { CommonContainer } from '@/components';
import { getErrorPageProps, getFormattedPath } from '@/utilities';
import { getCompositionProps } from '@/utilities/canvas';
import { enhancerCustomExtenderFactory, getArticles } from '@/utilities/enhancers/article';
import { getPreEnhancer } from '@/utilities/enhancers/commerce';
import { AppPages, InternalCompositionSlugs } from '@/constants';

export const getStaticProps: GetStaticProps<{ preview?: boolean }> = async context => {
  const { preview, params } = context;
  const { slug: initialSlug } = params || {};

  const path = getFormattedPath(AppPages.Articles, initialSlug);
  const articleSlug = String(initialSlug);
  const articles = await getMemoizedData({ preview });

  if (!articles || !path) return { notFound: true };

  const selectedArticle = articles?.[articleSlug];

  return getCompositionProps({
    path, // Request for custom page
    defaultPath: `${AppPages.Articles}${InternalCompositionSlugs.ArticleListing}`, // Request a default template page for articles in case there is no custom page
    context,
    extendEnhancer: selectedArticle ? enhancerCustomExtenderFactory(selectedArticle) : undefined,
    preEnhancer: !InternalCompositionSlugs.ArticleListing.includes(articleSlug)
      ? getPreEnhancer(articleSlug)
      : undefined,
  })
    .then(compositionProps => ({
      props: {
        ...compositionProps,
        preview: Boolean(preview),
      },
      revalidate: 31536000,
    }))
    .catch(getErrorPageProps);
};

const getMemoizedData = (() => {
  let memo: { [name: string]: Type.Article } | null = null;
  return async ({ preview = false }) => {
    if (memo && !preview) return memo;
    memo = await getArticles({
      path: AppPages.Articles,
      preview,
      parameterType: [
        ALGOLIA_QUERY_PARAMETER_TYPE,
        CONTENTFUL_ENTRY_QUERY_PARAMETER_TYPE,
        CONTENTFUL_ENTRY_MULTI_PARAMETER_TYPE,
        CONTENTSTACK_ENTRY_QUERY_PARAMETER_TYPE,
        CONTENTSTACK_ENTRY_MULTI_PARAMETER_TYPE,
      ],
      componentType: ['articleListItem'],
    });
    return memo;
  };
})();

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getMemoizedData({ preview: false });
  const paths = Object.keys(articles || {}).map(articleSlug => `${AppPages.Articles}/${articleSlug}`);
  return { paths, fallback: 'blocking' };
};

export default CommonContainer;
