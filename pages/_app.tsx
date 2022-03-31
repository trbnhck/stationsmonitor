import AppContext from 'context/AppContext';
import LocationProvider from 'providers/LocationProvider';
import Layout from 'components/Layout';

import 'styles/globals.css';

export default function Stationsmonitor({ Component, pageProps }) {
  return (
    <AppContext>
      <LocationProvider />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext>
  );
}
