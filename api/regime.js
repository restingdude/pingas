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
  const userKey = `regime:${userId}`;

  try {
    switch (req.method) {
      case 'GET':
        // Get user's regime
        const regime = await kv.get(userKey) || [];
        return res.status(200).json({ regime });

      case 'POST':
        // Add supplement to regime
        const { supplement, dosage, unit, timing, frequency } = req.body;
        
        if (!supplement || !dosage || !timing) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const currentRegime = await kv.get(userKey) || [];
        const newItem = {
          id: Date.now().toString(),
          supplement,
          dosage: parseFloat(dosage),
          unit: unit || 'mg',
          timing,
          frequency: frequency || 'daily',
          addedAt: new Date().toISOString()
        };

        const updatedRegime = [...currentRegime, newItem];
        await kv.set(userKey, updatedRegime);
        
        return res.status(201).json({ regime: updatedRegime });

      case 'DELETE':
        // Delete supplement from regime
        const { itemId } = req.body;
        
        if (!itemId) {
          return res.status(400).json({ error: 'Missing item ID' });
        }

        const regime_to_update = await kv.get(userKey) || [];
        const filteredRegime = regime_to_update.filter(item => item.id !== itemId);
        await kv.set(userKey, filteredRegime);
        
        return res.status(200).json({ regime: filteredRegime });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}