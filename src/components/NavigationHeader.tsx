import { FC } from 'react';
import dynamic from 'next/dynamic';
import NavigationHeaderTemplate from './NavigationHeaderTemplate';
import NavigationLink from './NavigationLink';
import { useUniformCurrentComponent } from '@uniformdev/canvas-react';
import { AppPages } from '../constants';

// local storage based fake cart functionality loaded only on the client side
const ShoppingCartIcon = dynamic(() => import('./ShoppingCartIcon').then(com => com), { ssr: false });

const Header: FC<Type.HeaderProps> = ({ navigationLinks = [], isCommerceApp }) => {
  const { data } = useUniformCurrentComponent();
  const hideHeader = data?.parameters?.hideHeader?.value;

  if (hideHeader) return null;

  return (
    <NavigationHeaderTemplate cartIcon={isCommerceApp ? <ShoppingCartIcon cartUrl={AppPages.Cart} /> : undefined}>
      {navigationLinks.map(({ title, link }) => (
        <NavigationLink key={title} title={title} link={link} />
      ))}
    </NavigationHeaderTemplate>
  );
};

export default Header;
