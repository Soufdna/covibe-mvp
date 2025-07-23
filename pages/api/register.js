// pages/api/register.js
import Airtable from 'airtable';

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;

// ⚠️ Mets exactement les noms utilisés dans Airtable
const TABLE_NAME = 'Beta Testers';
const EMAIL_FIELD = 'Email';

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { email } = req.body || {};
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid email' });
  }

  try {
    const records = await base(TABLE_NAME).create([{ fields: { [EMAIL_FIELD]: email } }]);
    return res.status(200).json({ success: true, id: records[0].id });
  } catch (error) {
    console.error('Airtable error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
