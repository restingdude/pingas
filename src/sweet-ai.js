// Sweet AI Assistant - Claude API Integration
import regimeManager from './regime-manager.js';

class SweetAI {
    constructor() {
        // Use API endpoint regardless of environment - Vercel handles routing
        this.apiUrl = '/api/sweet-ai';
        this.messagesContainer = null;
        this.inputField = null;
        this.sendButton = null;
        this.conversationHistory = [];
        this.isTyping = false;
        console.log('🤖 Sweet AI initialized with API URL:', this.apiUrl);
    }

    init() {
        this.fabButton = document.getElementById('sweet-fab');
        this.chatWindow = document.getElementById('sweet-chat-window');
        this.clearButton = document.getElementById('sweet-clear');
        this.closeButton = document.getElementById('sweet-close');
        this.messagesContainer = document.getElementById('sweet-messages');
        this.inputField = document.getElementById('sweet-input');
        this.sendButton = document.getElementById('sweet-send');

        if (!this.fabButton || !this.chatWindow || !this.messagesContainer || !this.inputField || !this.sendButton) {
            console.error('Sweet AI elements not found');
            return;
        }

        this.setupEventListeners();
        this.setupChatWindowEventListeners();
        this.loadConversationHistory();
        this.checkAPIAvailability();
    }

    async checkAPIAvailability() {
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        const initialMessage = document.getElementById('initial-sweet-message');
        
        if (!statusDot || !statusText) return;

        console.log('🔍 Checking API availability at:', this.apiUrl);
        
        // First test basic API routing
        try {
            console.log('🧪 Testing basic API connectivity...');
            const testResponse = await fetch('/api/test');
            if (testResponse.ok) {
                const testData = await testResponse.json();
                console.log('✅ Basic API working:', testData);
            } else {
                console.log('❌ Basic API failed:', testResponse.status);
            }
        } catch (e) {
            console.log('❌ API routing completely broken:', e);
        }

        // Now test Sweet AI endpoint
        try {
            console.log('🤖 Testing Sweet AI endpoint...');
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

            console.log('🔍 Sweet AI response status:', response.status);

            if (response.ok) {
                const responseData = await response.json();
                console.log('✅ Sweet AI response:', responseData);
                
                // API is available and working
                statusDot.className = 'status-dot';
                statusText.textContent = 'AI Connected';
                console.log('✅ Claude AI API is connected and working');
                
                // Update welcome message for full AI mode
                if (initialMessage) {
                    initialMessage.textContent = "Hi! I'm Sweet 💊 Ask me about supplements or optimizing your regime.";
                }
            } else {
                // Try to get error details
                try {
                    const errorData = await response.json();
                    console.log('🔍 API error details:', errorData);
                    this.handleAPIError(errorData, statusDot, statusText, initialMessage);
                } catch (e) {
                    console.log('❌ Could not parse error response');
                    this.setDevelopmentMode(statusDot, statusText, initialMessage, `API returned ${response.status}`);
                }
            }
        } catch (error) {
            console.log('⚠️ API check failed:', error.message);
            this.setDevelopmentMode(statusDot, statusText, initialMessage, error.message);
        }
    }

    handleAPIError(errorData, statusDot, statusText, initialMessage) {
        if (errorData.error === 'AI service not configured') {
            statusDot.className = 'status-dot development';
            statusText.textContent = 'API Key Missing';
            console.log('🔑 Claude API key not configured');
        } else {
            statusDot.className = 'status-dot development';
            statusText.textContent = 'API Error';
            console.log('❌ API error:', errorData.error);
        }
        
        if (initialMessage) {
            initialMessage.textContent = `Hi! I'm Sweet 💊 API issue: ${errorData.error}`;
        }
    }

    setDevelopmentMode(statusDot, statusText, initialMessage, reason) {
        statusDot.className = 'status-dot development';
        statusText.textContent = 'Development Mode';
        console.log('🔄 Using development mode:', reason);
        
        if (initialMessage) {
            initialMessage.textContent = "Hi! I'm Sweet 💊 Running in development mode.";
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

    setupChatWindowEventListeners() {
        // FAB button click to toggle chat window
        this.fabButton.addEventListener('click', () => {
            this.toggleChatWindow();
        });

        // Clear button click with confirmation
        this.clearButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear the chat?')) {
                this.clearConversation();
            }
        });

        // Close button click
        this.closeButton.addEventListener('click', () => {
            this.closeChatWindow();
        });

        // ESC key to close chat window
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.chatWindow.classList.contains('show')) {
                this.closeChatWindow();
            }
        });
    }

    toggleChatWindow() {
        if (this.chatWindow.classList.contains('show')) {
            this.closeChatWindow();
        } else {
            this.openChatWindow();
        }
    }

    openChatWindow() {
        this.chatWindow.classList.add('show');
        // Focus input field when chat window opens
        setTimeout(() => {
            this.inputField.focus();
        }, 100);
    }

    closeChatWindow() {
        this.chatWindow.classList.remove('show');
    }

    async sendMessage() {
        const message = this.inputField.value.trim();
        if (!message || this.isTyping) return;

        console.log('🔵 Sending message:', message);

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
            console.log('📝 Context:', context);
            
            // Send to Claude API
            console.log('🚀 Calling Claude API...');
            const response = await this.callClaudeAPI(message, context);
            console.log('✅ Got response:', response);
            
            // Remove typing indicator
            this.hideTypingIndicator();
            
            // Add AI response to chat
            this.addMessage(response, 'assistant');
            
            // Save conversation
            this.saveConversationHistory();
        } catch (error) {
            console.error('❌ Error in sendMessage:', error);
            this.hideTypingIndicator();
            this.addMessage(`Sorry, I encountered an error: ${error.message}. Please try again later.`, 'assistant');
        }
    }

    async callClaudeAPI(userMessage, context) {
        // Check if we're in development without API endpoint
        const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        console.log('🌐 API URL:', this.apiUrl);
        console.log('🏠 Is development:', isDevelopment);
        
        try {
            const requestBody = {
                message: userMessage,
                context: context,
                conversationHistory: this.conversationHistory.slice(-10) // Send last 10 messages for context
            };

            console.log('📤 Request body:', requestBody);

            // Add timeout to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            console.log('📥 Response status:', response.status);
            console.log('📥 Response ok:', response.ok);

            if (!response.ok) {
                let error;
                try {
                    error = await response.json();
                    console.log('❌ Error response:', error);
                } catch (e) {
                    error = { error: `HTTP ${response.status}` };
                    console.log('❌ Could not parse error response:', e);
                }
                
                // If API is configured but failing, show the error
                if (response.status === 500 && error.error === 'AI service not configured') {
                    throw new Error('Claude AI API key not configured. Please check environment variables.');
                } else if (response.status === 401) {
                    throw new Error('Claude AI API authentication failed. Please check your API key.');
                } else if (response.status === 404) {
                    // API endpoint not found
                    throw new Error('API endpoint not found. Make sure you are running with Vercel dev server.');
                } else {
                    throw new Error(error.details || error.error || `API request failed: ${response.status}`);
                }
            }

            const data = await response.json();
            console.log('📊 Response data:', data);
            
            // Check if we got a valid response
            if (!data.response) {
                console.error('❌ No response field in data:', data);
                throw new Error('Invalid response from AI service');
            }
            
            return data.response;
        } catch (error) {
            console.error('🚨 Exception in callClaudeAPI:', error);
            
            // Handle timeout specifically
            if (error.name === 'AbortError') {
                throw new Error('Request timed out after 30 seconds. Please try again.');
            }
            
            // Don't use development fallback - always try to connect to real AI
            throw error;
        }
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
                // Display saved messages in UI
                this.displaySavedMessages();
            } catch (error) {
                console.error('Error loading conversation history:', error);
                this.conversationHistory = [];
            }
        }
    }

    displaySavedMessages() {
        // Clear the initial message first
        this.messagesContainer.innerHTML = '';
        
        // If no saved messages, show initial message
        if (this.conversationHistory.length === 0) {
            this.messagesContainer.innerHTML = `
                <div class="sweet-message assistant">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <div class="message-bubble" id="initial-sweet-message">
                            Hi! I'm Sweet 💊 Ask me about supplements or optimizing your regime.
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        // Display saved messages
        this.conversationHistory.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `sweet-message ${msg.role}`;
            
            const avatar = msg.role === 'user' ? '👤' : '🤖';
            const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';
            
            messageDiv.innerHTML = `
                <div class="message-avatar">${avatar}</div>
                <div class="message-content">
                    <div class="message-bubble">
                        ${this.formatMessage(msg.content)}
                    </div>
                    <div class="message-time">${timestamp}</div>
                </div>
            `;

            this.messagesContainer.appendChild(messageDiv);
        });

        this.scrollToBottom();
    }


    clearConversation() {
        this.conversationHistory = [];
        localStorage.removeItem('sweetConversation');
        this.displaySavedMessages(); // This will show the initial message since history is empty
    }
}

// Create and export instance
const sweetAI = new SweetAI();
window.sweetAI = sweetAI;

export default sweetAI;