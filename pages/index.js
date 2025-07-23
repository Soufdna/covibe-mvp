import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // empêche le rechargement de la page
    const res = await fetch('/api/register', { // envoie vers l’API qu’on va créer
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }), // envoie l’email dans le body
    });
    if (res.ok) setSubmitted(true); // si tout est ok, affiche le message de succès
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-orange-200 to-yellow-200 flex flex-col items-center justify-center font-sans text-gray-800 px-6">
      <Head>
        <title>CoVibe – La coloc qui matche ta vibe</title>
        <script defer data-domain="covibe.vercel.app" src="https://plausible.io/js/script.js"></script>
      </Head>

      <main className="max-w-3xl w-full text-center">
        <h1 className="text-5xl font-extrabold mb-6">Trouve une coloc qui matche ta vibe.</h1>
        <p className="mb-12 text-xl md:text-2xl">
          Créateurs, développeurs, musiciens, freelancers…  
          Inscris-toi pour tester la version bêta de CoVibe.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ton adresse e-mail"
              className="rounded-xl px-5 py-3 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-pink-300 transition w-full sm:w-80"
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl px-6 py-3 transition shadow-lg"
            >
              Je veux tester 🎉
            </button>
          </form>
        ) : (
          <p className="text-green-700 font-semibold text-lg mb-20">
            Merci ! Tu es bien inscrit 🎉
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-left">
            <h3 className="text-xl font-bold mb-2">Lucas, 28 ans</h3>
            <p>🎬 Réalisateur à Montréal<br/>Recherche coloc calme, aime le café & le montage vidéo</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-left">
            <h3 className="text-xl font-bold mb-2">Sana, 25 ans</h3>
            <p>🎨 UX Designer à Vancouver<br/>Végétarienne, sportive, adore les dimanches chill</p>
          </div>
        </div>
      </main>
    </div>
  );
}
