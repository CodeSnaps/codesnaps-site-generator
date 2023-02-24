import type { PropsWithChildren } from 'react';
import classNames from 'classnames';

type BaseProps = {
  vertical?: boolean;
};

type Props = BaseProps &
  (
    | {
        bordered?: boolean;
      }
    | {
        secondary?: boolean;
      }
    | {
        pill?: boolean;
      }
  );

function NavigationMenu(props: PropsWithChildren<Props>) {
  return (
    <nav
      className={classNames(`NavigationMenu`, {
        PillNavigationMenu: 'pill' in props && props.pill,
        BorderedNavigationMenu: 'bordered' in props && props.bordered,
        SecondaryNavigationMenu: 'secondary' in props && props.secondary,
        VerticalNavigationMenu: props.vertical,
      })}
    >
      {props.children}
    </nav>
  );
}

export default NavigationMenu;
