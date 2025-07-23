import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid email' });
  }

  try {
    await base(process.env.AIRTABLE_TABLE_NAME).create([
      {
        fields: {
          [process.env.AIRTABLE_EMAIL_FIELD]: email,
        },
      },
    ]);

    return res.status(200).json({ message: 'Email added successfully' });
  } catch (error) {
    console.error('Airtable error:', error);
    return res.status(500).json({ message: 'Error saving to Airtable' });
  }
}
