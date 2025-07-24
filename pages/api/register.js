// pages/api/register.js
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME, AIRTABLE_EMAIL_FIELD } = process.env;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { email } = req.body || {};
  if (!email || typeof email !== 'string') return res.status(400).json({ message: 'Invalid email' });

  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [{ fields: { [AIRTABLE_EMAIL_FIELD]: email } }],
      }),
    });

    const data = await resp.json();
    if (!resp.ok) return res.status(resp.status).json({ success: false, error: data.error?.message || 'Airtable error' });

    return res.status(200).json({ success: true, id: data.records?.[0]?.id });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
