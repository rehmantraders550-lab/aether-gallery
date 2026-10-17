import type { SVGProps, ReactNode } from 'react';

type IconName = 'arrow' | 'arrow-right' | 'plus' | 'minus' | 'close' | 'menu' | 'eye' | 'reset' | 'chevron-left' | 'chevron-right' | 'external' | 'expand';
type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export function Icon({ name, size = 18, ...props }: Props) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const, ...props };
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    'arrow-right': <><path d="M7 17 17 7"/><path d="M8 7h9v9"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    minus: <path d="M5 12h14"/>,
    close: <path d="M5 5 19 19M19 5 5 19"/>,
    menu: <path d="M4 8h16M4 16h16"/>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    reset: <><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></>,
    'chevron-left': <path d="m15 18-6-6 6-6"/>,
    'chevron-right': <path d="m9 18 6-6-6-6"/>,
    external: <><path d="M14 4h6v6"/><path d="m20 4-9 9"/><path d="M20 14v6H4V4h6"/></>,
    expand: <><path d="M8 3H3v5m0-5 7 7M16 21h5v-5m0 5-7-7"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}
