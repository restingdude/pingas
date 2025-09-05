// API endpoint for Sweet AI Assistant
export default async function handler(req, res) {
    console.log('🚀 Sweet AI API called:', req.method);
    console.log('🔍 Request body:', req.body);
    
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
        console.log('✅ CORS preflight handled');
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        console.log('❌ Method not allowed:', req.method);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, context, conversationHistory } = req.body;

    if (!message) {
        console.log('❌ No message provided');
        return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.CLAUDE_API_KEY;
    console.log('🔑 API key present:', apiKey ? 'YES' : 'NO');
    
    if (!apiKey) {
        console.error('❌ Claude API key not configured');
        return res.status(500).json({ error: 'AI service not configured' });
    }

    const systemPrompt = `You are Sweet, a concise AI assistant for supplement regime optimization.

    Current user context:
    ${context || 'No specific context provided'}
    
    Guidelines:
    - Keep responses short and direct (1-3 sentences max)
    - Focus ONLY on supplements, regime optimization, and health questions
    - Reference user's current supplements when relevant
    - Give specific, actionable advice
    - Use minimal emojis (1 per response max)
    - Never provide medical diagnoses
    - If asked about non-health topics, redirect to regime/supplement questions`;

    console.log('🤖 Calling Claude API...');
    
    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 1024,
                temperature: 0.7,
                system: systemPrompt,
                messages: [
                    ...(conversationHistory || []).map(msg => ({
                        role: msg.role === 'user' ? 'user' : 'assistant',
                        content: msg.content
                    })),
                    {
                        role: 'user',
                        content: message
                    }
                ]
            })
        });

        console.log('📥 Claude API response status:', response.status);

        if (!response.ok) {
            const errorData = await response.text();
            console.error('❌ Claude API error:', response.status, errorData);
            return res.status(response.status).json({ 
                error: 'AI service error', 
                details: response.status === 401 ? 'Invalid API key' : 'Service temporarily unavailable'
            });
        }

        const data = await response.json();
        console.log('✅ Claude API response received');
        
        if (!data.content || !data.content[0] || !data.content[0].text) {
            console.error('❌ Unexpected response format:', data);
            return res.status(500).json({ error: 'Invalid response from AI service' });
        }

        console.log('✅ Returning AI response to client');
        return res.status(200).json({ 
            response: data.content[0].text,
            usage: data.usage // Include token usage for monitoring
        });
    } catch (error) {
        console.error('Error calling Claude API:', error);
        return res.status(500).json({ 
            error: 'Failed to get AI response',
            details: error.message 
        });
    }
}