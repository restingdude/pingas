// API Client for Vercel backend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-app-name.vercel.app/api' 
  : '/api';

class APIClient {
  constructor(userId = 'default') {
    this.userId = userId;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}?userId=${this.userId}`;
    
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