'use client';

import { Inter as SansFont, Manrope as HeadingFont } from 'next/font/google';

const sans = SansFont({
  subsets: ['latin'],
  variable: '--font-family-sans',
  fallback: ['system-ui', 'Helvetica Neue', 'Helvetica', 'Arial'],
  preload: true,
  weight: ['300', '400', '500', '600', '700', '800'],
});

const heading = HeadingFont({
  subsets: ['latin'],
  variable: '--font-family-heading',
  fallback: ['--font-family-sans'],
  preload: true,
  weight: ['400', '500'],
});

function Fonts() {
  return (
    <style jsx global>
      {`
        html {
          --font-family-sans: '-apple-system', 'BlinkMacSystemFont',
            ${sans.style.fontFamily}, 'system-ui', 'Segoe UI', 'Roboto',
            'Ubuntu', 'sans-serif';

          --font-family-heading: ${heading.style.fontFamily};
        }
      `}
    </style>
  );
}

export default Fonts;
