// Mock API for development - stores data in localStorage
class MockAPI {
    constructor() {
        this.baseKey = 'pingas_';
    }

    // Personal data methods
    getPersonalData(userId = 'default') {
        const key = `${this.baseKey}personal_${userId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : {};
    }

    savePersonalData(data, userId = 'default') {
        const key = `${this.baseKey}personal_${userId}`;
        const personalProfile = {
            name: data.name || '',
            dob: data.dob || '',
            gender: data.gender || '',
            weight: data.weight || '',
            height: data.height || '',
            activity: data.activity || 'moderate',
            goals: data.goals || [],
            conditions: data.conditions || [],
            biomarkers: data.biomarkers || {},
            notes: data.notes || '',
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(key, JSON.stringify(personalProfile));
        return personalProfile;
    }

    clearPersonalData(userId = 'default') {
        const key = `${this.baseKey}personal_${userId}`;
        localStorage.removeItem(key);
    }

    // Game state methods
    getGameState(userId = 'default') {
        const key = `${this.baseKey}gamestate_${userId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : {
            stats: {
                energy: 50, focus: 50, longevity: 50, mood: 50, strength: 50, immunity: 50,
                'heart-health': 50, 'bone-health': 50, 'skin-health': 50, 'hair-health': 50,
                'joint-health': 50, 'gut-health': 50, 'liver-health': 50, 'hormonal-balance': 50,
                vision: 50, 'oral-health': 50, 'anti-inflammatory': 50
            },
            level: 1, xp: 0, streak: 0, lastActivity: null, achievements: []
        };
    }

    updateGameState(updates, userId = 'default') {
        const currentState = this.getGameState(userId);
        const newState = { ...currentState, ...updates };
        const key = `${this.baseKey}gamestate_${userId}`;
        localStorage.setItem(key, JSON.stringify(newState));
        return newState;
    }

    // Regime methods
    getRegime(userId = 'default') {
        const key = `${this.baseKey}regime_${userId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    addToRegime(item, userId = 'default') {
        const regime = this.getRegime(userId);
        const newItem = {
            id: Date.now().toString(),
            ...item,
            addedAt: new Date().toISOString()
        };
        regime.push(newItem);
        const key = `${this.baseKey}regime_${userId}`;
        localStorage.setItem(key, JSON.stringify(regime));
        return regime;
    }

    removeFromRegime(itemId, userId = 'default') {
        const regime = this.getRegime(userId);
        const filtered = regime.filter(item => item.id !== itemId);
        const key = `${this.baseKey}regime_${userId}`;
        localStorage.setItem(key, JSON.stringify(filtered));
        return filtered;
    }
}

export default new MockAPI();