import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import Container, { PaddingSize } from '../components/Container';
import { withContent } from '../hocs/withContent';

type ArticleProps = ComponentProps<{
  title?: string;
  content?: string;
}>;

const Article: FC<ArticleProps> = ({ title, content = '' }) => (
  <Container paddingTop={PaddingSize.Large} paddingBottom={PaddingSize.Large}>
    <h1 className="text-4xl md:text-5xl font-extrabold pb-6 md:pb-14">{title}</h1>
    {Boolean(content) && <div dangerouslySetInnerHTML={{ __html: content }} className="max-w-5xl prose" />}
  </Container>
);

registerUniformComponent({
  type: 'article',
  component: withContent(Article),
});

export default Article;
