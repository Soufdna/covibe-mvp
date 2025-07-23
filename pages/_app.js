// pages/_app.js
import '../styles/globals.css'; // adapte si ton chemin est différent
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
