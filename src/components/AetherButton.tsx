import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from './Icons';

type Common = { children: ReactNode; quiet?: boolean; className?: string; icon?: boolean; };
type LinkProps = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type BtnProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

export function AetherButton(props: LinkProps | BtnProps) {
  const { children, quiet = false, icon = true, className = '', ...rest } = props;
  const classes = `aether-prism-btn${quiet ? ' aether-prism-btn--quiet' : ''} ${className}`.trim();
  const body = <><span className="aether-prism-btn__label">{children}</span>{icon && <Icon name="arrow" className="aether-prism-btn__icon" size={17}/>}</>;
  if ('href' in rest && typeof rest.href === 'string') {
    return <a {...rest as AnchorHTMLAttributes<HTMLAnchorElement>} className={classes}>{body}</a>;
  }
  return <button type="button" {...rest as ButtonHTMLAttributes<HTMLButtonElement>} className={classes}>{body}</button>;
}
