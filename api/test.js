// Simple test endpoint to verify API routing is working
export default async function handler(req, res) {
    console.log('🧪 Test API endpoint called');
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Check environment variables
    const hasClaudeKey = !!process.env.CLAUDE_API_KEY;
    
    return res.status(200).json({ 
        message: 'API is working!',
        method: req.method,
        timestamp: new Date().toISOString(),
        environment: {
            hasClaudeKey,
            nodeEnv: process.env.NODE_ENV
        }
    });
}