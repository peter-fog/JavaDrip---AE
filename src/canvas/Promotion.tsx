import { FC } from 'react';
import Image from 'next/image';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import Container, { PaddingSize } from '../components/Container';
import { withContent } from '../hocs/withContent';

type PromotionProps = ComponentProps<{
  title?: string;
  description?: string;
  couponCode?: string;
  icon?: string;
  backgroundImage?: string;
}>;

const Promotion: FC<PromotionProps> = ({ title, description, couponCode, icon = '', backgroundImage = '' }) => (
  <div className="relative">
    {Boolean(backgroundImage) && (
      <Image
        className="absolute w-full h-full object-cover"
        src={backgroundImage}
        fill
        alt="promotion-background-image"
        priority
      />
    )}
    <Container paddingTop={PaddingSize.None} paddingBottom={PaddingSize.None} backgroundClassName="pt-40">
      <div className="relative bg-neutral-800 md:bg-orange-900 relative md:-bottom-11 ml-auto w-full md:max-w-[658px] p-12 md:pl-24 md:pr-7 md:py-20 z-10">
        <p className="font-bold text-3xl md:text-4xl lg:text-5xl text-white">{title}</p>
        {Boolean(description) && <p className="mt-7 font-extrabold text-white">{description}</p>}
        {Boolean(couponCode) && (
          <p className="mt-7 font-extrabold text-white">
            Use the coupon code: <code>{couponCode}</code>
          </p>
        )}
        {icon && (
          <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/3">
            <Image alt="promotion-icon" src={icon} width="100" height="100" />
          </div>
        )}
      </div>
    </Container>
  </div>
);

registerUniformComponent({
  type: 'promotion',
  component: withContent(Promotion),
});

// Register for Promotion AI page
registerUniformComponent({
  type: 'promotionAI',
  component: withContent(Promotion),
});

export default Promotion;
