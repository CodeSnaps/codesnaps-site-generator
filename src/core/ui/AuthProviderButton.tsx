import Button from './Button';
import AuthProviderLogo from '~/core/ui/AuthProviderLogo';

const AuthProviderButton: React.FCC<{
  providerId: string;
  onClick: () => unknown;
}> = ({ children, providerId, onClick }) => {
  return (
    <Button
      data-cy={'auth-provider-button'}
      block
      color={'custom'}
      size={'large'}
      className={`relative border border-gray-200
        text-gray-600 ring-primary-500 transition-all
        hover:border-gray-300 hover:bg-gray-100 active:bg-gray-200
        dark:border-black-300 dark:bg-black-400
        dark:text-gray-200 dark:hover:border-black-100 dark:hover:bg-black-400/80 dark:active:bg-black-400`}
      onClick={onClick}
      data-provider={providerId}
    >
      <span className={'absolute left-3 flex items-center justify-start'}>
        <AuthProviderLogo providerId={providerId} />
      </span>

      <span className={'flex w-full flex-1 items-center'}>
        <span className={'flex w-full items-center justify-center'}>
          <span className={'text-current'}>{children}</span>
        </span>
      </span>
    </Button>
  );
};

export default AuthProviderButton;
