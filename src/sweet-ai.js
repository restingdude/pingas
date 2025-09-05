// Sweet AI Assistant - Claude API Integration
import regimeManager from './regime-manager.js';

class SweetAI {
    constructor() {
        // Use local API endpoint in development, Vercel function in production
        this.apiUrl = window.location.hostname === 'localhost' 
            ? '/api/sweet-ai' 
            : '/api/sweet-ai';
        this.messagesContainer = null;
        this.inputField = null;
        this.sendButton = null;
        this.conversationHistory = [];
        this.isTyping = false;
    }

    init() {
        this.messagesContainer = document.getElementById('sweet-messages');
        this.inputField = document.getElementById('sweet-input');
        this.sendButton = document.getElementById('sweet-send');

        if (!this.messagesContainer || !this.inputField || !this.sendButton) {
            console.error('Sweet AI elements not found');
            return;
        }

        this.setupEventListeners();
        this.loadConversationHistory();
        this.checkAPIAvailability();
    }

    async checkAPIAvailability() {
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        const initialMessage = document.getElementById('initial-sweet-message');
        
        if (!statusDot || !statusText) return;

        try {
            // Test API availability with a simple message
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Hello',
                    context: 'Test connection',
                    conversationHistory: []
                })
            });

            if (response.ok) {
                // API is available and working
                statusDot.className = 'status-dot';
                statusText.textContent = 'AI Connected';
                console.log('✅ Claude AI API is connected and working');
                
                // Update welcome message for full AI mode
                if (initialMessage) {
                    initialMessage.textContent = "Hi! I'm Sweet, your personal health optimization assistant powered by Claude AI. I can provide detailed supplement recommendations, analyze your regime, answer complex health questions, and give personalized advice based on your goals. What would you like to know?";
                }
            } else {
                throw new Error(`API returned ${response.status}`);
            }
        } catch (error) {
            // API not available, show development mode
            statusDot.className = 'status-dot development';
            statusText.textContent = 'Development Mode';
            console.log('⚠️ Claude AI API not available, using development mode:', error.message);
            
            // Update welcome message for development mode
            if (initialMessage) {
                initialMessage.textContent = "Hi! I'm Sweet, your health optimization assistant. I'm running in development mode with basic responses. Try asking about specific supplements like 'What does magnesium do?' or 'How's my regime looking?' for helpful information!";
            }
        }
    }

    setupEventListeners() {
        // Send button click
        this.sendButton.addEventListener('click', () => this.sendMessage());

        // Enter key press
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize input field
        this.inputField.addEventListener('input', () => {
            this.inputField.style.height = 'auto';
            this.inputField.style.height = this.inputField.scrollHeight + 'px';
        });
    }

    async sendMessage() {
        const message = this.inputField.value.trim();
        if (!message || this.isTyping) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Clear input
        this.inputField.value = '';
        this.inputField.style.height = 'auto';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Get context about user's regime
            const context = this.getUserContext();
            
            // Send to Claude API
            const response = await this.callClaudeAPI(message, context);
            
            // Remove typing indicator
            this.hideTypingIndicator();
            
            // Add AI response to chat
            this.addMessage(response, 'assistant');
            
            // Save conversation
            this.saveConversationHistory();
        } catch (error) {
            console.error('Error calling Claude API:', error);
            this.hideTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again later.', 'assistant');
        }
    }

    async callClaudeAPI(userMessage, context) {
        // Check if we're in development without API endpoint
        const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        try {
            const requestBody = {
                message: userMessage,
                context: context,
                conversationHistory: this.conversationHistory.slice(-10) // Send last 10 messages for context
            };

            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                let error;
                try {
                    error = await response.json();
                } catch (e) {
                    error = { error: `HTTP ${response.status}` };
                }
                
                // If API is configured but failing, show the error
                if (response.status === 500 && error.error === 'AI service not configured') {
                    throw new Error('Claude AI API key not configured. Please check environment variables.');
                } else if (response.status === 401) {
                    throw new Error('Claude AI API authentication failed. Please check your API key.');
                } else if (response.status === 404 && isDevelopment) {
                    // API endpoint not found in development, use fallback
                    return this.getDevelopmentResponse(userMessage);
                } else {
                    throw new Error(error.details || error.error || `API request failed: ${response.status}`);
                }
            }

            const data = await response.json();
            
            // Check if we got a valid response
            if (!data.response) {
                throw new Error('Invalid response from AI service');
            }
            
            return data.response;
        } catch (error) {
            // Network error or fetch failed - only use development fallback for connection errors
            if (isDevelopment && (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('404'))) {
                console.warn('API connection failed in development, using fallback:', error.message);
                return this.getDevelopmentResponse(userMessage);
            }
            throw error;
        }
    }
    
    getDevelopmentResponse(userMessage) {
        // Provide helpful responses in development when API is not available
        const lowerMessage = userMessage.toLowerCase();
        const regime = regimeManager.regime || [];
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "👋 Hi! I'm Sweet, your AI health assistant. I'm running in development mode right now, but I can still help you with basic questions about your supplements and provide general health advice!";
        }
        
        if (lowerMessage.includes('regime') || lowerMessage.includes('my supplements')) {
            if (regime.length === 0) {
                return "📋 You haven't added any supplements to your regime yet! Head over to the Regime tab to start building your personalized supplement stack. I can help you understand what supplements might be beneficial once you add some.";
            } else {
                const regimeList = regime.map(item => `• ${item.productName || item.supplement} (${item.dosage}${item.unit})`).join('\n');
                return `💊 Here's your current supplement regime:\n\n${regimeList}\n\nThis looks like a good start! Each supplement is contributing to different health stats. Check the Stats tab to see how they're boosting your health metrics.`;
            }
        }
        
        if (lowerMessage.includes('stats') || lowerMessage.includes('health')) {
            return "📊 Your health stats are tracked in the Stats tab! Each supplement in your regime contributes to different health metrics like energy, focus, longevity, and more. Click on any stat to see which supplements are affecting it and by how much.";
        }
        
        if (lowerMessage.includes('supplement') || lowerMessage.includes('vitamin')) {
            return "💊 I can help with supplement questions! Try asking me about:\n• Specific supplements (e.g., 'What does magnesium do?')\n• Health goals (e.g., 'I want better sleep')\n• Your current regime\n• Timing and dosages\n\nWhat would you like to know?";
        }
        
        if (lowerMessage.includes('magnesium')) {
            return "🧲 **Magnesium** is essential for:\n• Muscle and nerve function\n• Better sleep quality\n• Stress reduction\n• Bone health\n• Energy production\n\nCommon forms: Magnesium Glycinate (best absorption), Magnesium Oxide (higher dose), Magnesium Citrate (good bioavailability). Take 200-400mg in the evening for best results.";
        }
        
        if (lowerMessage.includes('vitamin d') || lowerMessage.includes('vitd')) {
            return "☀️ **Vitamin D** is crucial for:\n• Immune system function\n• Bone health and calcium absorption\n• Mood regulation\n• Muscle strength\n\nMost people are deficient! Recommended: 2000-4000 IU daily, preferably with fat for absorption. Get your blood levels tested to optimize dosage.";
        }
        
        if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
            return "😴 For better sleep, consider:\n• **Magnesium Glycinate** (200-400mg evening)\n• **Melatonin** (0.5-3mg 30min before bed)\n• **L-Theanine** (100-200mg for relaxation)\n• **GABA** (500-750mg for calming)\n\nAlso: Keep bedroom cool, no screens 1hr before bed, consistent sleep schedule.";
        }
        
        if (lowerMessage.includes('energy') || lowerMessage.includes('fatigue')) {
            return "⚡ For better energy levels, try:\n• **B-Complex** vitamins (morning with food)\n• **CoQ10** (100-200mg for cellular energy)\n• **Iron** (if deficient - get tested first)\n• **Vitamin D** (2000-4000 IU)\n• **Rhodiola** (300-400mg for adaption)\n\nAlso check: Sleep quality, hydration, and stress levels.";
        }
        
        if (lowerMessage.includes('focus') || lowerMessage.includes('brain') || lowerMessage.includes('concentration')) {
            return "🧠 For better focus and brain function:\n• **Lion's Mane** (500-1000mg for neurogenesis)\n• **Omega-3** (EPA/DHA 1000-2000mg)\n• **Bacopa Monnieri** (300-600mg for memory)\n• **L-Theanine** (100-200mg for calm focus)\n• **Phosphatidylserine** (100mg for cognitive support)\n\nPair with good sleep, regular exercise, and minimal distractions.";
        }
        
        if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
            return "🤖 I'm Sweet, your health optimization assistant! I can help with:\n\n💊 **Supplement advice** - What to take, when, and why\n📊 **Stats explanation** - Understanding your health metrics\n🎯 **Goal-based recommendations** - Supplements for specific needs\n⏰ **Timing guidance** - When to take different supplements\n🔍 **General health questions** - Nutrition, sleep, wellness tips\n\nTry asking me about specific supplements, health goals, or your current regime!";
        }
        
        // Default response with more helpful context
        return `🤔 That's an interesting question about "${userMessage}"! I'm running in development mode, so I have limited AI capabilities, but I can still help with:\n\n• Basic supplement information\n• Your current regime analysis\n• General health and wellness tips\n• Explaining your health stats\n\nTry asking me something like "What does magnesium do?" or "How's my regime looking?" for more detailed responses!`;
    }

    getUserContext() {
        // Get user's current regime
        const regime = regimeManager.regime || [];
        const regimeText = regime.length > 0 
            ? `User's current supplements: ${regime.map(item => `${item.productName || item.supplement} (${item.dosage}${item.unit}, ${item.timing || 'unspecified timing'})`).join(', ')}`
            : 'User has not added any supplements to their regime yet.';

        // Get user's personal data if available
        const personalDataKey = localStorage.getItem('pingas_personal_default');
        let personalData = {};
        if (personalDataKey) {
            try {
                personalData = JSON.parse(personalDataKey);
            } catch (e) {
                personalData = {};
            }
        }
        
        const personalText = personalData.name 
            ? `User info: ${personalData.name} ${personalData.dob ? `DOB: ${personalData.dob}` : ''} ${personalData.gender || ''} ${personalData.goals ? `Goals: ${personalData.goals.join(', ')}` : ''} ${personalData.conditions ? `Health conditions: ${personalData.conditions.join(', ')}` : ''}`
            : 'No personal profile information available.';

        // Get current stat boosts for context
        const statBoosts = regimeManager.expectedBoosts || {};
        const boostText = Object.keys(statBoosts).length > 0
            ? `Current stat boosts from supplements: ${Object.entries(statBoosts).filter(([,boost]) => boost > 0).map(([stat, boost]) => `${stat.replace('-', ' ')}: +${Math.round(boost)}`).join(', ')}`
            : 'No current stat boosts from supplements.';

        return `${regimeText}\n${personalText}\n${boostText}`;
    }

    addMessage(content, role) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `sweet-message ${role}`;
        
        const avatar = role === 'user' ? '👤' : '🤖';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <div class="message-bubble">
                    ${this.formatMessage(content)}
                </div>
                <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        `;

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();

        // Add to history
        this.conversationHistory.push({ role, content, timestamp: new Date().toISOString() });
        
        // Keep only last 20 messages in history
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-20);
        }
    }

    formatMessage(content) {
        // Convert markdown-style formatting to HTML
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/`(.*?)`/g, '<code>$1</code>');
    }

    showTypingIndicator() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'sweet-message assistant typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-bubble">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;

        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    saveConversationHistory() {
        // Save last 10 messages to localStorage
        const toSave = this.conversationHistory.slice(-10);
        localStorage.setItem('sweetConversation', JSON.stringify(toSave));
    }

    loadConversationHistory() {
        const saved = localStorage.getItem('sweetConversation');
        if (saved) {
            try {
                this.conversationHistory = JSON.parse(saved);
                // Don't display old messages in UI, just keep in memory for context
            } catch (error) {
                console.error('Error loading conversation history:', error);
                this.conversationHistory = [];
            }
        }
    }

    clearConversation() {
        this.conversationHistory = [];
        this.messagesContainer.innerHTML = `
            <div class="sweet-message assistant">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-bubble">
                        Hi! I'm Sweet, your personal health optimization assistant. How can I help you today?
                    </div>
                </div>
            </div>
        `;
        localStorage.removeItem('sweetConversation');
    }
}

// Create and export instance
const sweetAI = new SweetAI();
window.sweetAI = sweetAI;

export default sweetAI;