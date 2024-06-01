import FaqComponent from '~/app/(site)/components/FaqComponent';
import { withI18n } from '~/i18n/with-i18n';

export const metadata = {
  title: 'FAQ',
};

const FAQPage = () => {
  return (
    <div>
      <FaqComponent />
    </div>
  );
};

export default withI18n(FAQPage);
