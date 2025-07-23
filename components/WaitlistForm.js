import { useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setSubmitted(true);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-10 max-w-md mx-auto">
      {submitted ? (
        <p className="text-green-600 text-center">Merci ! Tu es bien inscrit·e à la liste d’attente 🎉</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="text-sm font-medium text-gray-700">Ton e-mail</label>
          <input
            type="email"
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-800 transition">
            Rejoindre la liste d’attente
          </button>
        </form>
      )}
    </div>
  );
}
