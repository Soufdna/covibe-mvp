import { useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function WaitlistForm() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    email: '',
    vibe: '',
    job: '',
    city: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici tu peux ajouter la logique pour envoyer les données à ta base ou API
    setSubmitted(true);
  };

  if (submitted) {
    return <p className="text-green-700 font-semibold text-lg mb-20">{t('waitlistThankYou')}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg mb-20">
      <h2 className="text-2xl font-bold mb-4">{t('joinWaitlist')}</h2>
      <input
        type="email"
        name="email"
        required
        placeholder={t('emailPlaceholder')}
        value={formData.email}
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded"
      />
      <input
        type="text"
        name="vibe"
        placeholder={t('vibePlaceholder')}
        value={formData.vibe}
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded"
      />
      <input
        type="text"
        name="job"
        placeholder={t('jobPlaceholder')}
        value={formData.job}
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded"
      />
      <input
        type="text"
        name="city"
        placeholder={t('cityPlaceholder')}
        value={formData.city}
        onChange={handleChange}
        className="w-full mb-6 p-3 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded transition"
      >
        {t('joinWaitlistButton')}
      </button>
    </form>
  );
}
