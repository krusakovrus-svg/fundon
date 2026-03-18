import type { SportIconKind } from '@/data/sports';

export function SportGlyph({ kind, className = 'h-[1.2rem] w-[1.2rem]' }: { kind: SportIconKind; className?: string }) {
  const common = {
    viewBox: '0 0 24 24',
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8'
  } as const;

  switch (kind) {
    case 'football':
    case 'handball':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M8.5 8.2l3.5-1.6l3.5 1.6l.8 3.6l-2.4 3.1h-3.8l-2.4-3.1z" />
        </svg>
      );
    case 'hockey':
      return (
        <svg {...common}>
          <path d="M6 6l5 5" strokeLinecap="round" />
          <path d="M11 11l-3 7" strokeLinecap="round" />
          <path d="M10.2 17.8h4.8" strokeLinecap="round" />
          <circle cx="18" cy="16.5" r="1.8" />
        </svg>
      );
    case 'tennis':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M7.5 6.8c4.8 1.6 6.8 5.2 9 10.2" />
          <path d="M16.5 6.8c-4.8 1.6-6.8 5.2-9 10.2" />
        </svg>
      );
    case 'table-tennis':
      return (
        <svg {...common}>
          <path d="M7 8.2a4.5 4.5 0 118 2.9c-.8 1.7-2.8 2.9-5 2.9S6 12.5 6 10.6c0-.8.3-1.6 1-2.4z" />
          <path d="M14.5 14.5l3.8 3.8" strokeLinecap="round" />
        </svg>
      );
    case 'basketball':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.8 12h16.4" />
          <path d="M12 3.8c2.2 2.4 3.4 5 3.4 8.2S14.2 17.8 12 20.2" />
          <path d="M12 3.8c-2.2 2.4-3.4 5-3.4 8.2s1.2 5.8 3.4 8.2" />
        </svg>
      );
    case 'esports':
      return (
        <svg {...common}>
          <rect x="4.5" y="8" width="15" height="8" rx="3" />
          <path d="M9 12H6.8" strokeLinecap="round" />
          <path d="M7.9 10.9V13.1" strokeLinecap="round" />
          <circle cx="15.8" cy="11" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="17.8" cy="13" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'volleyball':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 3.5c2 2 3.8 4.5 4.6 7.4" />
          <path d="M4.5 9.2c3.3-.5 6.3.2 9 2.1" />
          <path d="M7.4 18.8c.6-3.2 2.4-5.9 5.4-7.8" />
        </svg>
      );
    case 'martial-arts':
      return (
        <svg {...common}>
          <path d="M6.5 13.5c0-1.7 1.1-3.1 2.8-3.1h2.3l1.9-2a1.7 1.7 0 012.5 2.3l-1.7 1.8h1.3a2.7 2.7 0 010 5.4H10a3.4 3.4 0 01-3.4-3.4z" />
        </svg>
      );
    case 'boxing':
      return (
        <svg {...common}>
          <path d="M9 7.2c0-1.5 1.2-2.7 2.7-2.7h.7c1.4 0 2.6 1.2 2.6 2.7v1.4h.4a2.6 2.6 0 012.6 2.6v4.2A3.6 3.6 0 0114.4 19H10a3 3 0 01-3-3v-4.8A4 4 0 019 7.2z" />
        </svg>
      );
    case 'baseball':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M8 7c1.8 1.2 2.8 3 2.8 5S9.8 15.8 8 17" />
          <path d="M16 7c-1.8 1.2-2.8 3-2.8 5s1 3.8 2.8 5" />
        </svg>
      );
    case 'rugby':
    case 'australian-football':
      return (
        <svg {...common}>
          <path d="M7.2 16.8c-2.2-2.2-2.2-5.8 0-8l1.7-1.7c2.2-2.2 5.8-2.2 8 0c2.2 2.2 2.2 5.8 0 8l-1.7 1.7c-2.2 2.2-5.8 2.2-8 0z" />
          <path d="M10 10.5h4" strokeLinecap="round" />
          <path d="M12 9v3" strokeLinecap="round" />
        </svg>
      );
    case 'formula1':
      return (
        <svg {...common}>
          <path d="M4 15h7l5-4h4" strokeLinecap="round" />
          <path d="M4 11h10l2-2h4" strokeLinecap="round" />
          <path d="M8 15l2.5-4" strokeLinecap="round" />
        </svg>
      );
    case 'water-polo':
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="4.2" />
          <path d="M4 18c1-.8 2-.8 3 0s2 .8 3 0 2-.8 3 0 2 .8 3 0 2-.8 3 0" strokeLinecap="round" />
          <path d="M9.5 9h5" />
          <path d="M12 6.5v5" />
        </svg>
      );
    case 'darts':
      return (
        <svg {...common}>
          <path d="M6 18l8-8" strokeLinecap="round" />
          <path d="M13.2 6.8l3.6 3.6" strokeLinecap="round" />
          <path d="M14.8 5.2l4 4" strokeLinecap="round" />
        </svg>
      );
    case 'cricket':
      return (
        <svg {...common}>
          <path d="M9 6l4 12" strokeLinecap="round" />
          <path d="M8 16l4-1.4" strokeLinecap="round" />
          <circle cx="16.8" cy="8.2" r="1.7" />
        </svg>
      );
    case 'curling':
      return (
        <svg {...common}>
          <path d="M8 10.5h7a3.5 3.5 0 010 7H8a3.5 3.5 0 010-7z" />
          <path d="M11 10.5V8.5h4" strokeLinecap="round" />
        </svg>
      );
    case 'snooker':
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="1.6" />
          <circle cx="16" cy="8" r="1.6" />
          <circle cx="12" cy="12.5" r="1.6" />
          <circle cx="8" cy="17" r="1.6" />
          <circle cx="16" cy="17" r="1.6" />
        </svg>
      );
    case 'field-hockey':
      return (
        <svg {...common}>
          <path d="M8 6l3 10" strokeLinecap="round" />
          <path d="M11 16h5" strokeLinecap="round" />
          <circle cx="18.5" cy="16.5" r="1.3" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
        </svg>
      );
  }
}
