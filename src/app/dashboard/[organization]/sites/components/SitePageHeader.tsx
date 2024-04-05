'use client';

import { useState } from 'react';

import Button from '~/core/ui/Button';
import { PageHeader } from '~/core/ui/Page';
import Trans from '~/core/ui/Trans';

const SitePageHeader = () => {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
  };

  return (
    <PageHeader
      title="Site Generator"
      description="Create and generate sites here"
    >
      {loading ? (
        <Button className="w-full max-w-[200px]" loading disabled>
          <Trans i18nKey="sites:createSiteBtnLabel" />
        </Button>
      ) : (
        <Button
          href={'sites/new'}
          className="w-full max-w-[200px]"
          onClick={() => {
            handleButtonClick();
          }}
        >
          <StarsIcons className="w-5 h-5 mr-1" />
          <Trans i18nKey="sites:createSiteBtnLabel" />
        </Button>
      )}
    </PageHeader>
  );
};

function StarsIcons(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 001.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 00-1.828 1.829l-.645 1.936a.361.361 0 01-.686 0l-.645-1.937a2.89 2.89 0 00-1.828-1.828l-1.937-.645a.361.361 0 010-.686l1.937-.645a2.89 2.89 0 001.828-1.828zM3.794 1.148a.217.217 0 01.412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 010 .412l-1.162.387A1.73 1.73 0 004.593 5.69l-.387 1.162a.217.217 0 01-.412 0L3.407 5.69A1.73 1.73 0 002.31 4.593l-1.162-.387a.217.217 0 010-.412l1.162-.387A1.73 1.73 0 003.407 2.31zM10.863.099a.145.145 0 01.274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 010 .274l-.774.258a1.16 1.16 0 00-.732.732l-.258.774a.145.145 0 01-.274 0l-.258-.774a1.16 1.16 0 00-.732-.732L9.1 2.137a.145.145 0 010-.274l.774-.258c.346-.115.617-.386.732-.732z"></path>
    </svg>
  );
}

export default SitePageHeader;
