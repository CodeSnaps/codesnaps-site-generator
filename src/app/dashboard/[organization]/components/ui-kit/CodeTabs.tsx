'use client';

import clsx from 'clsx';

import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

interface CodeTabsProps {
  code_tailwindcss_react: string;
  code_tailwindcss_nextjs: string;
  code_animation_react: string;
  code_animation_nextjs: string;
}

function CodeTabs({
  code_tailwindcss_react,
  code_tailwindcss_nextjs,
  code_animation_react,
  code_animation_nextjs,
}: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState('react');
  const [activeCode, setActiveCode] = useState(code_tailwindcss_react);

  const showCopiedToast = () => {
    toast.success('Copied to clipboard!', {
      duration: 3000,
      position: 'bottom-right',
    });
  };

  return (
    <div className="mt-6">
      <div className="bg-neutral-700 dark:bg-neutral-800 border rounded-t-lg flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between py-2 px-3">
        <div className="flex items-center space-x-2">
          {activeTab === 'react' ? (
            <>
              <button
                className={clsx(
                  activeCode === code_tailwindcss_react
                    ? 'bg-neutral-950'
                    : 'bg-transparent hover:bg-neutral-800 dark:hover:bg-neutral-900',
                  'flex items-center space-x-2 px-2.5 py-2 rounded-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400',
                )}
                onClick={() => setActiveCode(code_tailwindcss_react)}
              >
                <ReactIcon className="w-5 h-5" />
                <span className="text-sm font-medium text-white">
                  index.jsx
                </span>
              </button>

              {code_animation_react && (
                <button
                  className={clsx(
                    activeCode === code_animation_react
                      ? 'bg-neutral-950'
                      : 'bg-transparent hover:bg-neutral-800 dark:hover:bg-neutral-900',
                    'flex items-center space-x-2 px-2.5 py-2 rounded-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400',
                  )}
                  onClick={() => setActiveCode(code_animation_react)}
                >
                  <ReactIcon className="w-5 h-5" />
                  <span className="text-sm font-medium text-white">
                    Animation.jsx
                  </span>
                </button>
              )}
            </>
          ) : (
            <>
              <button
                className={clsx(
                  activeCode === code_tailwindcss_nextjs
                    ? 'bg-neutral-950'
                    : 'bg-transparent hover:bg-neutral-800 dark:hover:bg-neutral-900',
                  'flex items-center space-x-2 px-2.5 py-2 rounded-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400',
                )}
                onClick={() => setActiveCode(code_tailwindcss_nextjs)}
              >
                <ReactIcon className="w-5 h-5" />
                <span className="text-sm font-medium text-white">page.jsx</span>
              </button>

              {code_animation_nextjs && (
                <button
                  className={clsx(
                    activeCode === code_animation_nextjs
                      ? 'bg-neutral-950'
                      : 'bg-transparent hover:bg-neutral-800 dark:hover:bg-neutral-900',
                    'flex items-center space-x-2 px-2.5 py-2 rounded-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400',
                  )}
                  onClick={() => setActiveCode(code_animation_nextjs)}
                >
                  <ReactIcon className="w-5 h-5" />
                  <span className="text-sm font-medium text-white">
                    Animation.jsx
                  </span>
                </button>
              )}
            </>
          )}
        </div>

        <div className="flex items-center justify-between space-x-2 order-first sm:order-last">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-md bg-transparent px-3.5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-neutral-500 hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
              >
                {activeTab === 'react' ? (
                  <>
                    <ReactIcon className="w-5 h-5" />
                    React
                  </>
                ) : (
                  <>
                    <NextIcon className="w-5 h-5" />
                    Next.js
                  </>
                )}
                <ChevronDownIcon className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 bg-neutral-950 border-neutral-600 text-white">
              <DropdownMenuItem
                onClick={() => {
                  setActiveTab('react');
                  setActiveCode(code_tailwindcss_react);
                }}
              >
                <ReactIcon className="w-5 h-5 mr-2" />
                React
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setActiveTab('nextjs');
                  setActiveCode(code_tailwindcss_nextjs);
                }}
              >
                <NextIcon className="w-5 h-5 mr-2" />
                Next.js
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <CopyToClipboard text={activeCode} onCopy={() => showCopiedToast()}>
            <span className="rounded-full bg-transparent px-3.5 py-3 text-sm font-semibold text-white hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400">
              <>
                <ClipboardIcon className="w-5 h-5" />
                <span className="sr-only">Copy code to clipboard</span>
              </>
            </span>
          </CopyToClipboard>
        </div>
      </div>
      <CodeMirror
        value={activeCode}
        theme={githubDark}
        extensions={[javascript({ jsx: true })]}
        editable={false}
        height="600px"
      />
    </div>
  );
}

export default CodeTabs;

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function ReactIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="#53C1DE"
        d="M18.679 15.976c0-1.435-1.2-2.598-2.679-2.598-1.48 0-2.679 1.163-2.679 2.598 0 1.434 1.2 2.597 2.679 2.597 1.48 0 2.679-1.163 2.679-2.597z"
      ></path>
      <path
        fill="#53C1DE"
        fillRule="evenodd"
        d="M24.7 11.154c.566-2.23 1.277-6.363-1.23-7.764-2.495-1.395-5.742 1.278-7.456 2.883-1.71-1.589-5.048-4.25-7.552-2.845-2.494 1.4-1.725 5.465-1.147 7.708-2.327.64-6.315 2.02-6.315 4.84 0 2.811 3.984 4.313 6.297 4.953-.58 2.255-1.311 6.262 1.186 7.659 2.514 1.405 5.842-1.194 7.572-2.816 1.726 1.614 4.942 4.23 7.437 2.83 2.504-1.406 1.852-5.484 1.273-7.74 2.242-.641 6.235-2.11 6.235-4.886 0-2.793-4.01-4.184-6.3-4.822zm-.284 8.513a28.65 28.65 0 00-1.519-3.685 28.625 28.625 0 001.46-3.631c1.679.472 5.361 1.55 5.361 3.625 0 2.094-3.533 3.183-5.302 3.691zm-1.566 7.859c-1.862 1.045-4.628-1.456-5.902-2.645a29.352 29.352 0 002.514-3.096c1.45-.125 2.821-.329 4.064-.607.407 1.595 1.194 5.298-.676 6.348zm-13.726-.015c-1.863-1.041-1.011-4.616-.584-6.278 1.228.264 2.589.453 4.042.568.83 1.132 1.7 2.173 2.576 3.085-1.083 1.015-4.163 3.671-6.034 2.625zM2.28 15.976c0-2.102 3.661-3.173 5.378-3.643a29.257 29.257 0 001.462 3.673 29.689 29.689 0 00-1.48 3.726c-1.637-.454-5.36-1.653-5.36-3.756zM9.104 4.504c1.87-1.05 4.77 1.506 6.012 2.656a29.97 29.97 0 00-2.556 3.066c-1.41.127-2.761.33-4.003.604-.466-1.81-1.321-5.278.547-6.326zm11.275 7.073c.957.117 1.875.273 2.736.464-.259.803-.581 1.643-.96 2.504a41.165 41.165 0 00-1.776-2.968zm-4.365-3.529c.591.621 1.183 1.314 1.766 2.066a38.897 38.897 0 00-3.546 0 27.651 27.651 0 011.78-2.066zm-6.157 6.496a26.884 26.884 0 01-.954-2.517 29.762 29.762 0 012.72-.452 36.303 36.303 0 00-1.766 2.97zm1.793 5.922a28.076 28.076 0 01-2.764-.431c.264-.83.59-1.692.972-2.568a36.306 36.306 0 001.792 2.999zm4.4 3.525a28.142 28.142 0 01-1.805-2.094c1.188.045 2.378.045 3.566-.006a26.611 26.611 0 01-1.761 2.1zm6.117-6.569c.4.886.739 1.744 1.007 2.559a27.97 27.97 0 01-2.798.462c.639-.982 1.239-1.99 1.79-3.02zm-3.42 3.172a41.486 41.486 0 01-5.463.01 34.923 34.923 0 01-2.746-4.598 34.908 34.908 0 012.73-4.59c1.82-.133 3.65-.134 5.469 0a39.137 39.137 0 012.739 4.572 39.146 39.146 0 01-2.729 4.606zM22.83 4.467c1.87 1.046 1.038 4.76.63 6.376a31.597 31.597 0 00-4.012-.615 29.379 29.379 0 00-2.536-3.069c1.258-1.175 4.066-3.728 5.918-2.692z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

function NextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g clipPath="url(#clip0)">
        <path
          fill="currentColor"
          d="M11.214.006c-.052.005-.216.022-.364.033C7.442.347 4.25 2.186 2.226 5.013a11.88 11.88 0 00-2.118 5.243c-.096.66-.108.854-.108 1.748s.012 1.089.108 1.748c.652 4.507 3.86 8.293 8.209 9.696.779.251 1.6.422 2.533.526.364.04 1.936.04 2.3 0 1.611-.179 2.977-.578 4.323-1.265.207-.105.247-.134.219-.157-.02-.014-.899-1.194-1.955-2.62l-1.919-2.593-2.404-3.559a342.499 342.499 0 00-2.422-3.556c-.009-.003-.018 1.578-.023 3.51-.007 3.38-.01 3.516-.052 3.596a.426.426 0 01-.206.213c-.075.038-.14.045-.495.045H7.81l-.108-.068a.44.44 0 01-.157-.172l-.05-.105.005-4.704.007-4.706.073-.092a.644.644 0 01.174-.143c.096-.047.133-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 2 2.895 4.362l4.734 7.172 1.9 2.878.097-.063a12.318 12.318 0 002.465-2.163 11.947 11.947 0 002.825-6.135c.096-.66.108-.854.108-1.748s-.012-1.088-.108-1.748C23.24 5.75 20.032 1.963 15.683.56a12.6 12.6 0 00-2.498-.523c-.226-.024-1.776-.05-1.97-.03zm4.913 7.26a.473.473 0 01.237.276c.018.06.023 1.365.018 4.305l-.007 4.218-.743-1.14-.746-1.14v-3.066c0-1.983.009-3.097.023-3.151a.478.478 0 01.232-.296c.097-.05.132-.054.5-.054.347 0 .408.005.486.047z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="currentColor" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

function ClipboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
      />
    </svg>
  );
}
