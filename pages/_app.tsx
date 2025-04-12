import '@/styles/globals.css'; // ✅ correct path (adjust if needed)

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
