import Link from 'next/link';

import Container from '~/core/ui/Container';
import LogoImage from '~/core/ui/Logo/LogoImage';
import configuration from '~/configuration';

const YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className={'py-8 lg:py-24'}>
      <Container>
        <div className={'flex flex-col space-y-8 lg:flex-row lg:space-y-0'}>
          <div
            className={
              'flex w-full space-x-2 lg:w-4/12 xl:w-3/12' +
              ' xl:space-x-6 2xl:space-x-8'
            }
          >
            <div className={'flex flex-col space-y-4'}>
              <div>
                <LogoImage className={'w-[85px] md:w-[115px]'} />
              </div>

              <div>
                <p className={'text-sm text-neutral-500 dark:text-neutral-400'}>
                  Build faster, design better in React and Tailwind CSS
                </p>
              </div>

              <div
                className={
                  'flex text-xs text-neutral-500 dark:text-neutral-400'
                }
              >
                <p>
                  © Copyright {YEAR} {configuration.site.siteName}. All Rights
                  Reserved.
                </p>
              </div>
            </div>
          </div>

          <div
            className={
              'flex flex-col space-y-8 lg:space-y-0 lg:space-x-6' +
              ' xl:space-x-16 2xl:space-x-20' +
              ' w-full lg:flex-row lg:justify-end'
            }
          >
            <div>
              <div className={'flex flex-col space-y-4'}>
                <FooterSectionHeading>About</FooterSectionHeading>

                <FooterSectionList>
                  <FooterLink>
                    <Link href={'/browse-components'}>Components</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link href={'/faq'}>FAQ</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link href={'/pricing'}>Pricing</Link>
                  </FooterLink>
                </FooterSectionList>
              </div>
            </div>

            <div className={'flex flex-col space-y-4'}>
              <FooterSectionHeading>Auth</FooterSectionHeading>

              <FooterSectionList>
                <FooterLink>
                  <Link href={'/auth/sign-in'}>Sign In</Link>
                </FooterLink>
                <FooterLink>
                  <Link href={'/auth/sign-up'}>Register</Link>
                </FooterLink>
              </FooterSectionList>
            </div>

            <div>
              <div className={'flex flex-col space-y-4'}>
                <FooterSectionHeading>Legal</FooterSectionHeading>

                <FooterSectionList>
                  <FooterLink>
                    <Link href={'/legal'}>Company</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link href={'/legal/privacy'}>Privacy Policy</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link href={'/legal/terms'}>Terms of Service</Link>
                  </FooterLink>
                </FooterSectionList>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterSectionHeading(props: React.PropsWithChildren) {
  return (
    <p>
      <span className={'font-semibold'}>{props.children}</span>
    </p>
  );
}

function FooterSectionList(props: React.PropsWithChildren) {
  return (
    <ul
      className={
        'flex flex-col space-y-4 text-neutral-500 dark:text-neutral-400'
      }
    >
      {props.children}
    </ul>
  );
}

function FooterLink(props: React.PropsWithChildren) {
  return (
    <li
      className={
        'text-sm [&>a]:transition-colors [&>a]:hover:text-neutral-800' +
        ' dark:[&>a]:hover:text-white'
      }
    >
      {props.children}
    </li>
  );
}

export default Footer;
