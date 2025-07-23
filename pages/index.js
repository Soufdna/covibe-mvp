import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import nextI18NextConfig from '../next-i18next.config';
import ProfileCard from '../components/ProfileCard';

export default function Home() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const changeLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-orange-200 to-yellow-200 flex flex-col items-center font-sans text-gray-800">
      {/* padding global page */}
      <div className="w-full max-w-5xl px-6 pt-24 pb-32">
        {/* Choix de la langue */}
        <div className="mb-10 flex justify-center gap-4">
          <button
            onClick={() => changeLanguage('en')}
            disabled={locale === 'en'}
            className="px-4 py-2 rounded bg-white shadow hover:bg-gray-100 disabled:opacity-50"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('fr')}
            disabled={locale === 'fr'}
            className="px-4 py-2 rounded bg-white shadow hover:bg-gray-100 disabled:opacity-50"
          >
            Français
          </button>
        </div>

        {/* Logo centré */}
        <div className="flex justify-center mb-10">
          <Image
            src="/images/symbol-covibe.png"
            alt="CoVibe logo"
            width={120}
            height={120}
            priority
          />
        </div>

        <h1 className="text-5xl font-extrabold mb-6 text-center">{t('welcome')}</h1>
        <p className="mb-16 text-xl md:text-2xl text-center">{t('description')}</p>

        {/* Formulaire d'email */}
        {!submitted ? (
          <div className="flex flex-col items-center mb-28">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4">
              {/* Bloc input + note */}
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className="rounded-xl px-5 py-3 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-pink-300 transition w-full sm:w-80 h-[52px]"
                />
                <p className="text-sm text-gray-600 mt-2 ml-1">
                  {t('betaNote')}
                </p>
              </div>

              {/* Bouton compact */}
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl px-6 h-[52px] transition shadow-lg whitespace-nowrap shrink-0"
              >
                {t('submitButton')}
              </button>
            </form>
          </div>
        ) : (
          <p className="text-green-700 font-semibold text-lg mb-28 text-center">{t('thankYou')}</p>
        )}

        {/* Profils avec images */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
          <ProfileCard
            name={t('profile1.name')}
            description={t('profile1.description')}
            image="/images/lucas.jpg"
          />
          <ProfileCard
            name={t('profile2.name')}
            description={t('profile2.description')}
            image="/images/sana.jpg"
          />
          <ProfileCard
            name={t('profile3.name')}
            description={t('profile3.description')}
            image="/images/kylie.jpg"
          />
        </section>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}
