import { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import NavBar from '../Components/Navbar';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
