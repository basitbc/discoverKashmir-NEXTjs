import { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import NavBar from '../Components/Navbar';
import '../styles/globals.css';

import AOS from 'aos';
import 'aos/dist/aos.css';
import PreLoader from '../Components/PreLoader';

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    AOS.init({
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
    });
  }, []);

  // useEffect(() => {
  //   AOS.init({
  //     easing: 'ease-out-cubic',
  //     once: true,
  //     offset: 50,
  //   });
  // }, []);

  useEffect(() => {
    // setTimeout(() => setLoading(false), 3000);
  });
  return loading ? (
    <PreLoader />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
