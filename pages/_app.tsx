import '../styles/marketplace/utils.css';
import '../styles/global.css';

import React, { useMemo } from "react";
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import CssBaseline from '@mui/material/CssBaseline';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material';

import { useStore } from 'src/common/store';

import AppLocale from 'localization';
import EnLang from 'localization/entries/en-US';
import restheme from 'src/theme';
import CircularLoader from 'src/components/loader';
import GlobalStyles from '@mui/material/GlobalStyles';

//Web3 for Solana
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

//
import NProgress from 'nprogress';
import '../public/css/nprogress.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ScrollToTop from 'src/components/scrolltotop'
// 
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
import commonService from 'src/common/services/common.service';
import { MARKETPLACES_API } from 'src/common/config';
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const CLUSTER_API = process.env.NEXT_PUBLIC_CLUSTER_API || ``;

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();
  const [endpoint, setEndpoint] = React.useState(CLUSTER_API);

  const network = WalletAdapterNetwork.Devnet;
  // let endpoint = CLUSTER_API;//useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  React.useEffect(() => {
    const handleStart = url => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  React.useEffect(() => {
    (async () => {
      try {
        const cluster: any = await commonService({
          method: "get",
          route: `${MARKETPLACES_API.GET_RPC}`
        });

        if (cluster?.value) {
          setEndpoint(cluster?.value)
        }
      }
      catch {

      }

    })();
  }, []);

  const jsonLdData = JSON.stringify({
    '@context': 'http://www.schema.org',
    '@type': 'Organization',
    name: 'Symentix',
    url: 'https://symentix.com/',
    logo: 'https://symentix.com/wp-content/uploads/2021/04/logo-symentix-1.png',
    image:
      'https://symentix.com/wp-content/uploads/2020/03/home-banner-3-1.jpg',
    description:
      'Symentix Technologies Pvt Ltd is a software development company. It’s development and innovation center is located in Sanganer, Jaipur,  India. Symentix has always maintained several effective, efficient IT consulting solutions to assist businesses with IT risk management, focusing on improving IT performance and reducing development and maintainence cost.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'full address',
      addressRegion: 'Rajasthan',
      postalCode: '333031',
      addressCountry: 'India'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '91 95710 73055',
      contactType: 'Customer Support'
    }
  });
  return (
    <PersistGate loading={null} persistor={store.persistor}>
      <Provider store={store}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <ThemeProvider theme={restheme}>
                <IntlProvider
                  locale='en'
                  defaultLocale='en'
                  messages={AppLocale.en.messages}>
                  <Head>
                    <title>Your NFT Hub</title>
                    <meta
                      name='viewport'
                      content='initial-scale=1.0, width=device-width'
                    />
                    <meta
                      name='robots'
                      content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
                    />
                    <meta
                      name='description'
                      content='Symentix blog is a collection of different technology, trends, and management related articles. Checkout blog to read more about different topics.'
                    />
                    <link
                      rel='canonical'
                      href='https://symentix.com/blog/b2b-marketing-tools-that-very-business-needs-2022/'
                    />
                    <meta property='og:locale' content='en_US' />
                    <meta property='og:type' content='article' />
                    <meta
                      property='og:title'
                      content='B2B Marketing Tools That Very Business Needs: 2022 - Symentix'
                    />
                    <meta
                      property='og:description'
                      content='Symentix blog is a collection of different technology, trends, and management related articles. Checkout blog to read more about different topics.'
                    />
                    <meta
                      property='og:url'
                      content='https://symentix.com/blog/b2b-marketing-tools-that-very-business-needs-2022/'
                    />
                    <meta property='og:site_name' content='Symentix' />
                    <meta
                      property='article:modified_time'
                      content='2022-01-05T07:53:38+00:00'
                    />
                    <meta
                      property='og:image'
                      content='https://symentix.com/wp-content/uploads/2021/12/B2B-Marketing.jpg'
                    />
                    <meta property='og:image:width' content='1200' />
                    <meta property='og:image:height' content='630' />
                    <meta name='twitter:card' content='summary_large_image' />
                    <meta name='twitter:label1' content='Est. reading time' />
                    <meta name='twitter:data1' content='5 minutes' />
                    <meta name='generator' content='Site Kit by Google 1.43.0' />
                    <script type='application/ld+json'>{jsonLdData}</script>
                  </Head>
                  <CssBaseline />
                  <GlobalStyles styles={{ root: { textTransform: 'capitalize' } }} />
                  <Component {...pageProps} />
                  <ScrollToTop />
                </IntlProvider>
              </ThemeProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </Provider>
    </PersistGate>
  );
}
