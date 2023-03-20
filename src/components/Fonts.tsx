'use client';

import { Inter as SansFont, Manrope as HeadingFont } from 'next/font/google';
import { useServerInsertedHTML } from 'next/navigation';

const sans = SansFont({
  subsets: ['latin'],
  variable: '--font-family-sans',
  fallback: ['system-ui', 'Helvetica Neue', 'Helvetica', 'Arial'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const heading = HeadingFont({
  subsets: ['latin'],
  variable: '--font-family-heading',
  fallback: ['--font-family-sans'],
  weight: ['400', '500'],
  display: 'swap',
});

function Fonts() {
  useServerInsertedHTML(() => {
    return (
      <style
        key={'fonts'}
        dangerouslySetInnerHTML={{
          __html: `
          :root {
            --font-family-sans: '-apple-system', 'BlinkMacSystemFont',
              ${sans.style.fontFamily}, 'system-ui', 'Segoe UI', 'Roboto',
              'Ubuntu', 'sans-serif';

            --font-family-heading: ${heading.style.fontFamily};
          }
        `,
        }}
      />
    );
  });

  return null;
}

export default Fonts;

export function PagesDirectoryFonts() {
  return (
    <style jsx global>
      {`
        :root {
          --font-family-sans: '-apple-system', 'BlinkMacSystemFont',
            ${sans.style.fontFamily}, 'system-ui', 'Segoe UI', 'Roboto',
            'Ubuntu', 'sans-serif';

          --font-family-heading: ${heading.style.fontFamily};
        }
      `}
    </style>
  );
}
