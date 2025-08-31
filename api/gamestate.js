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
  const userKey = `gamestate:${userId}`;

  const defaultGameState = {
    stats: {
      energy: 50, focus: 50, longevity: 50, mood: 50, strength: 50, immunity: 50,
      'heart-health': 50, 'bone-health': 50, 'skin-health': 50, 'hair-health': 50,
      'joint-health': 50, 'gut-health': 50, 'liver-health': 50, 'hormonal-balance': 50,
      vision: 50, 'oral-health': 50, 'anti-inflammatory': 50
    },
    level: 1,
    xp: 0,
    streak: 0,
    lastActivity: null,
    achievements: [],
    dailyQuests: { morning: false, perfect: false, streak: false }
  };

  try {
    switch (req.method) {
      case 'GET':
        // Get user's game state
        const gameState = await kv.get(userKey) || defaultGameState;
        return res.status(200).json({ gameState });

      case 'POST':
        // Update game state
        const updates = req.body;
        const currentState = await kv.get(userKey) || defaultGameState;
        
        const updatedState = {
          ...currentState,
          ...updates,
          stats: {
            ...currentState.stats,
            ...(updates.stats || {})
          },
          lastUpdated: new Date().toISOString()
        };

        await kv.set(userKey, updatedState);
        
        return res.status(200).json({ gameState: updatedState });

      case 'DELETE':
        // Reset game state
        await kv.set(userKey, defaultGameState);
        return res.status(200).json({ gameState: defaultGameState });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}