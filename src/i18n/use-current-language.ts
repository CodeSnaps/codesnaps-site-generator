import { cookies } from 'next/headers';
import { I18N_COOKIE_NAME } from '~/i18n/i18n.settings';

function useCurrentLanguage() {
  return cookies().get(I18N_COOKIE_NAME)?.value;
}

export default useCurrentLanguage;
