'use client';

import { Editor, Frame } from '@craftjs/core';
import { decompressFromEncodedURIComponent } from 'lz-string';

import { modules } from '~/app/dashboard/[organization]/sites/[id]/components/selectors/modules';

interface PreviewPageProps {
  props: {
    organization: string;
    id: string;
  };
  site: {
    data: {
      id: string;
      color_scheme: string;
      site_schema: string;
      project_name: string;
    };
  };
}

const PreviewPage = ({ props, site }: PreviewPageProps) => {
  const decompressedSiteSchema = decompressFromEncodedURIComponent(
    site.data.site_schema,
  );

  return (
    <>
      <Editor resolver={modules} enabled={false}>
        <div className="flex h-full w-full justify-center">
          <Frame data={decompressedSiteSchema}></Frame>
        </div>
      </Editor>
    </>
  );
};

export default PreviewPage;
