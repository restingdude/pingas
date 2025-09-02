// API endpoint for Sweet AI Assistant
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, context, conversationHistory } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.CLAUDE_API_KEY;
    
    if (!apiKey) {
        console.error('Claude API key not configured');
        return res.status(500).json({ error: 'AI service not configured' });
    }

    const systemPrompt = `You are Sweet, a friendly and knowledgeable AI health optimization assistant for the PINGAS Health Optimization System. 
    You help users optimize their supplement regimes, provide evidence-based health advice, and answer questions about nutrition and longevity.
    
    Current user context:
    ${context || 'No specific context provided'}
    
    Guidelines:
    - Be friendly, encouraging, and supportive
    - Provide evidence-based recommendations
    - Reference specific supplements when relevant
    - Consider the user's current regime when making suggestions
    - Keep responses concise but informative
    - Use emojis occasionally to be more engaging
    - Focus on health optimization and longevity
    - Never provide medical diagnoses or replace professional medical advice`;

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
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

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Claude API error:', response.status, errorData);
            return res.status(response.status).json({ 
                error: 'AI service error', 
                details: response.status === 401 ? 'Invalid API key' : 'Service temporarily unavailable'
            });
        }

        const data = await response.json();
        
        if (!data.content || !data.content[0] || !data.content[0].text) {
            console.error('Unexpected response format:', data);
            return res.status(500).json({ error: 'Invalid response from AI service' });
        }

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