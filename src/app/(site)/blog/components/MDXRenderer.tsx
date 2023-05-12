import { getMDXComponent } from 'next-contentlayer/hooks';
import Components from '~/app/(site)/blog/components/MDXComponents';

function Mdx({
  code,
}: React.PropsWithChildren<{
  code: string;
}>) {
  const Component = getMDXComponent(code);

  return <Component components={Components} />;
}

export default Mdx;
