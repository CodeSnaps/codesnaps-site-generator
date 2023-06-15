import { getMDXComponent } from 'next-contentlayer/hooks';
import type { NestedMDXComponents } from 'mdx/types';
import MDXComponents from '~/app/(site)/blog/components/MDXComponents';

function Mdx({
  code,
}: React.PropsWithChildren<{
  code: string;
}>) {
  const Component = getMDXComponent(code);

  return <Component components={MDXComponents as NestedMDXComponents} />;
}

export default Mdx;
