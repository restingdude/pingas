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
                // If in development and API endpoint not found, return a helpful message
                if (isDevelopment && response.status === 404) {
                    return this.getDevelopmentResponse(userMessage);
                }
                
                let error;
                try {
                    error = await response.json();
                } catch (e) {
                    error = { error: 'API endpoint not available' };
                }
                throw new Error(error.details || error.error || `API request failed: ${response.status}`);
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            // In development, provide helpful responses even without API
            if (isDevelopment && error.message.includes('404')) {
                return this.getDevelopmentResponse(userMessage);
            }
            throw error;
        }
    }
    
    getDevelopmentResponse(userMessage) {
        // Provide helpful responses in development when API is not available
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "👋 Hi! I'm Sweet, your AI health assistant. In development mode, I have limited functionality, but once deployed to Vercel, I'll be able to provide personalized health optimization advice!";
        }
        
        if (lowerMessage.includes('supplement') || lowerMessage.includes('vitamin')) {
            return "💊 I can help you optimize your supplement regime! Currently in development mode, but once deployed, I'll analyze your current supplements and provide personalized recommendations based on your health goals.";
        }
        
        if (lowerMessage.includes('help')) {
            return "🤖 I'm Sweet, your personal health optimization assistant! I can:\n\n• Recommend supplements based on your goals\n• Analyze your current regime\n• Provide dosage and timing advice\n• Answer health and longevity questions\n\n(Full functionality available when deployed to Vercel)";
        }
        
        return `🔧 Development Mode: I received your message "${userMessage}". The full AI functionality will be available when the app is deployed to Vercel with the API endpoint configured. For now, try adding supplements to your regime and exploring the other features of the app!`;
    }

    getUserContext() {
        // Get user's current regime
        const regime = regimeManager.regime || [];
        const regimeText = regime.length > 0 
            ? `User's current supplements: ${regime.map(item => `${item.productName || item.supplement} (${item.dosage}${item.unit})`).join(', ')}`
            : 'User has not added any supplements to their regime yet.';

        // Get user's personal data if available
        const personalData = JSON.parse(localStorage.getItem('personalData') || '{}');
        const personalText = personalData.name 
            ? `User info: ${personalData.age ? `Age ${personalData.age}` : ''} ${personalData.gender || ''} ${personalData.goals ? `Goals: ${personalData.goals.join(', ')}` : ''}`
            : '';

        return `${regimeText}\n${personalText}`;
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