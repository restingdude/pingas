import mockAPI from './mock-api.js';

class APIClient {
  constructor(userId = 'default') {
    this.userId = userId;
    this.isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  }

  async request(endpoint, options = {}) {
    // Use mock API for development
    if (this.isDevelopment) {
      return this.handleMockRequest(endpoint, options);
    }

    // Use real API for production
    const url = `/api${endpoint}?userId=${this.userId}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async handleMockRequest(endpoint, options = {}) {
    console.log('Using mock API for:', endpoint, options.method || 'GET');
    
    // Simulate async delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const method = options.method || 'GET';
    const body = options.body ? JSON.parse(options.body) : null;

    try {
      if (endpoint === '/personal') {
        if (method === 'GET') {
          const personalData = mockAPI.getPersonalData(this.userId);
          return { personalData };
        } else if (method === 'POST') {
          const personalData = mockAPI.savePersonalData(body, this.userId);
          return { personalData };
        } else if (method === 'DELETE') {
          mockAPI.clearPersonalData(this.userId);
          return { message: 'Personal data cleared' };
        }
      } else if (endpoint === '/gamestate') {
        if (method === 'GET') {
          const gameState = mockAPI.getGameState(this.userId);
          return { gameState };
        } else if (method === 'POST') {
          const gameState = mockAPI.updateGameState(body, this.userId);
          return { gameState };
        }
      } else if (endpoint === '/regime') {
        if (method === 'GET') {
          const regime = mockAPI.getRegime(this.userId);
          return { regime };
        } else if (method === 'POST') {
          const regime = mockAPI.addToRegime(body, this.userId);
          return { regime };
        } else if (method === 'DELETE') {
          const regime = mockAPI.removeFromRegime(body.itemId, this.userId);
          return { regime };
        }
      }

      throw new Error('Endpoint not found');
    } catch (error) {
      console.error('Mock API error:', error);
      throw error;
    }
  }

  // Regime API methods
  async getRegime() {
    return this.request('/regime');
  }

  async addToRegime(supplementData) {
    return this.request('/regime', {
      method: 'POST',
      body: JSON.stringify(supplementData),
    });
  }

  async removeFromRegime(itemId) {
    return this.request('/regime', {
      method: 'DELETE',
      body: JSON.stringify({ itemId }),
    });
  }

  // Personal data API methods
  async getPersonalData() {
    return this.request('/personal');
  }

  async savePersonalData(personalData) {
    return this.request('/personal', {
      method: 'POST',
      body: JSON.stringify(personalData),
    });
  }

  async clearPersonalData() {
    return this.request('/personal', {
      method: 'DELETE',
    });
  }

  // Game state API methods
  async getGameState() {
    return this.request('/gamestate');
  }

  async updateGameState(updates) {
    return this.request('/gamestate', {
      method: 'POST',
      body: JSON.stringify(updates),
    });
  }

  async resetGameState() {
    return this.request('/gamestate', {
      method: 'DELETE',
    });
  }
}

export default APIClient;