import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS for all origins in development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { userId = 'default' } = req.query;
  const userKey = `personal:${userId}`;

  try {
    switch (req.method) {
      case 'GET':
        // Get user's personal data
        const personalData = await kv.get(userKey) || {};
        return res.status(200).json({ personalData });

      case 'POST':
        // Save personal data
        console.log('Personal API - Received data:', req.body);
        
        const {
          name, dob, gender, weight, height, activity,
          goals, conditions, biomarkers, notes
        } = req.body;

        const personalProfile = {
          name: name || '',
          dob: dob || '',
          gender: gender || '',
          weight: weight || '',
          height: height || '',
          activity: activity || 'moderate',
          goals: goals || [],
          conditions: conditions || [],
          biomarkers: biomarkers || {},
          notes: notes || '',
          lastUpdated: new Date().toISOString()
        };

        console.log('Personal API - Saving profile:', personalProfile);
        await kv.set(userKey, personalProfile);
        console.log('Personal API - Profile saved successfully');
        
        return res.status(200).json({ personalData: personalProfile });

      case 'DELETE':
        // Clear personal data
        await kv.del(userKey);
        return res.status(200).json({ message: 'Personal data cleared' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}