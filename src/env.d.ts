declare var blocklet: { prefix: string } | undefined;

declare module '@arcblock/did-connect/lib/Session';
declare module 'react-router-dom';
declare module '@tailwindcss/vite';

declare module '*.svg';

interface ValidationErrors {
  username?: string;
  email?: string;
  phone?: string;
}
