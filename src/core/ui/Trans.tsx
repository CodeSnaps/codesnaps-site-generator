import { Trans as TransComponent } from 'react-i18next/TransWithoutContext';
import suspensify from '~/core/generic/suspensify';
import initializeServerI18n from '~/i18n/i18n.server';
import isBrowser from '~/core/generic/is-browser';

const resource = suspensify(initializeServerI18n());

function Trans(props: React.ComponentProps<typeof TransComponent>) {
  if (isBrowser()) {
    return <TransComponent {...props} />;
  }

  return <ServerTransComponent {...props} />;
}

export default Trans;

function ServerTransComponent(
  props: React.ComponentProps<typeof TransComponent>
) {
  const _ = resource.read();

  return <TransComponent {...props} />;
}
