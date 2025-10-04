export const ICONS = {
  DOCUMENT: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 text-primary',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    },
  },
  EDIT: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 text-primary',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    },
  },
  TAG: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 text-primary',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
    },
  },
  CHECK_CIRCLE: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 text-primary',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  },
  CALENDAR: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 text-primary',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    },
  },
  USER: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 text-primary',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
  },
  CHEVRON_DOWN: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 text-base-content/50',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M19 9l-7 7-7-7',
    },
  },
  ERROR: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4',
      fill: 'currentColor',
      stroke: 'none',
      viewBox: '0 0 20 20',
    },
    path: {
      fillRule: 'evenodd',
      d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z',
      clipRule: 'evenodd',
    },
  },
  CLOSE: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M6 18L18 6M6 6l12 12',
    },
  },
  PLUS: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
    },
  },
  SPINNER: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 animate-spin',
      fill: 'none',
      stroke: 'none',
      viewBox: '0 0 24 24',
    },
    path: {
      d: 'm4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
    },
    circle: {
      class: 'opacity-25',
      cx: '12',
      cy: '12',
      r: '10',
      stroke: 'currentColor',
      strokeWidth: '4',
    },
  },
  EMAIL: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 text-primary',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
  },
  PHONE: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 text-primary',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    },
  },
  LOCATION: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 text-primary',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
    },
  },
  NOTE: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 text-primary',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    },
  },
  LOGIN: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 text-primary',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1',
    },
  },
  LOCK: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 text-primary',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    },
  },
  USER_PLUS: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4 text-primary',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
    },
  },
  SUCCESS: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M5 13l4 4L19 7',
    },
  },
  WARNING: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
    },
  },
  INFO: {
    div: {
      class: '',
    },
    svg: {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    },
    path: {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
      d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  },
} as const;
