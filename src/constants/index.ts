export enum BaseAddPages {
  Home = '/',
  Cart = '/cart',
}

export enum ProductPagesPrefixes {
  ProductListPage = '/shop',
  ProductDetailsPage = '/products',
}

export enum ArticlePagesPrefixes {
  ArticlesPage = '/articles',
}

export const AppPages = {
  ...BaseAddPages,
  CoffeeMakers: `${ProductPagesPrefixes.ProductListPage}/coffee-makers`,
  Beans: `${ProductPagesPrefixes.ProductListPage}/beans`,
  Articles: '/articles',
  Products: '/products',
};

export const InternalCompositionSlugs = {
  ProductDetails: '/product-slug',
  ArticleListing: '/article-slug',
  ProductListingPrefix: ProductPagesPrefixes.ProductListPage,
};
