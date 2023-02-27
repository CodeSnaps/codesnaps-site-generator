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
      className={`relative border border-gray-200 text-gray-600 ring-primary-200
        ring-offset-1 transition-all hover:border-gray-300 hover:bg-gray-50
        focus:ring-2 active:bg-gray-100 dark:border-black-300
        dark:bg-black-400 dark:text-gray-200 dark:ring-primary-500/70
        dark:hover:border-black-200 dark:hover:bg-black-300 
        dark:focus:ring-offset-black-400 dark:active:bg-black-300`}
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
