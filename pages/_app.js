import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import Layout from '../Components/Layout/Layout';
import { SiteSettingsProvider } from '../context/SiteSettingsContext';
import AdminThemeProvider from '../Components/admin/AdminThemeProvider';
import ToastProvider from '../Components/admin/ui/ToastProvider';
import '../styles/globals.css';

import AOS from 'aos';
import 'aos/dist/aos.css';
import PreLoader from '../Components/PreLoader';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
    });
  }, []);

  // These render standalone: no site header, footer or navigation.
  //  /admin/*          the CMS has its own chrome
  //  /pay/*            a checkout screen must have one job and no exits
  //  /payment/result   the post-payment confirmation
  //  /payment*         the customer payment form and its result page
  const path = router.pathname;
  const isStandalone =
    path.startsWith('/admin') ||
    path.startsWith('/pay/') ||
    path.startsWith('/payment');

  // The admin gets its own design system and no public chrome. The theme is
  // applied here rather than per-page so navigating between admin screens does
  // not remount the provider and flash the wrong colours.
  if (isStandalone) {
    return (
      <SessionProvider session={session}>
        <AdminThemeProvider>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </AdminThemeProvider>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      {/* siteSettings comes from each page's getStaticProps via getSiteProps(). */}
      <SiteSettingsProvider value={pageProps.siteSettings}>
        {loading ? (
          <PreLoader />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SiteSettingsProvider>
    </SessionProvider>
  );
}
