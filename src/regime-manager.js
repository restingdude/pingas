// Regime Management System
import { SUPPLEMENT_DATABASE, calculateSupplementEffects, getSupplementByKey, getRecommendedDosage } from './supplement-database.js';
import APIClient from './api-client.js';

const apiClient = new APIClient();

class RegimeManager {
    constructor() {
        this.regime = [];
        this.expectedBoosts = {};
    }

    // Initialize regime manager
    async init() {
        await this.loadRegime();
        this.setupEventListeners();
    }

    // Load regime from database
    async loadRegime() {
        try {
            const result = await apiClient.getRegime();
            this.regime = result.regime || [];
            this.updateRegimeDisplay();
            this.calculateExpectedBoosts();
        } catch (error) {
            console.error('Error loading regime:', error);
            // Fallback to localStorage for offline mode
            const saved = localStorage.getItem('regime');
            if (saved) {
                this.regime = JSON.parse(saved);
                this.updateRegimeDisplay();
                this.calculateExpectedBoosts();
            }
        }
    }

    // Add supplement to regime
    async addSupplement(supplementData) {
        const { supplement, dosage, unit, timing, frequency } = supplementData;
        
        // Validate supplement exists in database
        const supplementInfo = getSupplementByKey(supplement);
        if (!supplementInfo) {
            throw new Error('Invalid supplement selected');
        }

        // Check if supplement already exists
        const exists = this.regime.find(item => item.supplement === supplement);
        if (exists) {
            throw new Error('Supplement already in your regime');
        }

        const newItem = {
            id: Date.now().toString(),
            supplement,
            dosage: parseFloat(dosage),
            unit: unit || 'mg',
            timing,
            frequency: frequency || 'daily',
            addedAt: new Date().toISOString(),
            ...supplementInfo // Include supplement info for offline access
        };

        try {
            const result = await apiClient.addToRegime(newItem);
            this.regime = result.regime;
            
            // Update localStorage as backup
            localStorage.setItem('regime', JSON.stringify(this.regime));
        } catch (error) {
            console.error('Error adding to regime, using local storage:', error);
            this.regime.push(newItem);
            localStorage.setItem('regime', JSON.stringify(this.regime));
        }

        this.updateRegimeDisplay();
        this.calculateExpectedBoosts();
        return newItem;
    }

    // Remove supplement from regime
    async removeSupplement(itemId) {
        try {
            const result = await apiClient.removeFromRegime(itemId);
            this.regime = result.regime;
            
            // Update localStorage as backup
            localStorage.setItem('regime', JSON.stringify(this.regime));
        } catch (error) {
            console.error('Error removing from regime, using local storage:', error);
            this.regime = this.regime.filter(item => item.id !== itemId);
            localStorage.setItem('regime', JSON.stringify(this.regime));
        }

        this.updateRegimeDisplay();
        this.calculateExpectedBoosts();
    }

    // Calculate expected stat boosts from current regime
    calculateExpectedBoosts() {
        this.expectedBoosts = {};
        
        this.regime.forEach(item => {
            const effects = calculateSupplementEffects(item.supplement, item.dosage, item.unit);
            
            Object.entries(effects).forEach(([stat, boost]) => {
                this.expectedBoosts[stat] = (this.expectedBoosts[stat] || 0) + boost;
            });
        });

        this.updateBoostsDisplay();
    }

    // Update regime display in UI
    updateRegimeDisplay() {
        const regimeList = document.getElementById('regime-list');
        if (!regimeList) return;

        if (this.regime.length === 0) {
            regimeList.innerHTML = '<div class="empty-state">No supplements in your regime yet. Add some to get started!</div>';
            return;
        }

        regimeList.innerHTML = this.regime.map(item => {
            const supplementInfo = getSupplementByKey(item.supplement);
            const level = this.getDosageLevel(item);
            
            return `
                <div class="regime-item" data-id="${item.id}">
                    <div class="regime-info">
                        <h4>${supplementInfo?.name || item.supplement}</h4>
                        <div class="regime-details">
                            <span class="dosage">${item.dosage}${item.unit}</span>
                            <span class="timing">${item.timing}</span>
                            <span class="frequency">${item.frequency}</span>
                            <span class="level level-${level}">${level} dose</span>
                        </div>
                        ${supplementInfo?.description ? `<div class="basis">${supplementInfo.description}</div>` : ''}
                    </div>
                    <button class="delete-regime-btn" onclick="regimeManager.removeSupplement('${item.id}')">×</button>
                </div>
            `;
        }).join('');
    }

    // Update expected boosts display
    updateBoostsDisplay() {
        const boostsContainer = document.getElementById('expected-boosts');
        if (!boostsContainer) return;

        if (Object.keys(this.expectedBoosts).length === 0) {
            boostsContainer.innerHTML = '<div class="empty-state">Add supplements to see expected benefits</div>';
            return;
        }

        // Sort boosts by value (highest first)
        const sortedBoosts = Object.entries(this.expectedBoosts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 12); // Show top 12 boosts

        boostsContainer.innerHTML = sortedBoosts.map(([stat, boost]) => `
            <div class="boost-item">
                <span class="stat-name">${stat.replace('-', ' ')}</span>
                <span class="boost-value">+${Math.round(boost)}</span>
            </div>
        `).join('');
    }

    // Get dosage level (low/medium/high) for a supplement
    getDosageLevel(item) {
        const supplementInfo = getSupplementByKey(item.supplement);
        if (!supplementInfo?.dosage) return 'medium';

        const { low, medium, high } = supplementInfo.dosage;
        const dosage = item.dosage;

        if (dosage <= low.max) return 'low';
        if (dosage >= high.min) return 'high';
        return 'medium';
    }

    // Setup event listeners
    setupEventListeners() {
        const regimeForm = document.getElementById('regime-form');
        const supplementSelect = document.getElementById('regime-supplement');
        const dosageInput = document.getElementById('regime-dosage');
        const unitSelect = document.getElementById('regime-unit');

        if (!regimeForm || !supplementSelect) return;

        // Auto-fill recommended dosage when supplement is selected
        supplementSelect.addEventListener('change', (e) => {
            const supplementKey = e.target.value;
            if (!supplementKey) return;

            const recommended = getRecommendedDosage(supplementKey, 'medium');
            if (recommended && dosageInput) {
                dosageInput.value = recommended.min;
                if (unitSelect) {
                    unitSelect.value = recommended.unit;
                }
            }
        });

        // Handle form submission
        regimeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(regimeForm);
            const supplementData = {
                supplement: formData.get('supplement') || supplementSelect.value,
                dosage: formData.get('dosage') || dosageInput.value,
                unit: formData.get('unit') || unitSelect.value,
                timing: formData.get('timing') || document.getElementById('regime-timing')?.value,
                frequency: formData.get('frequency') || document.getElementById('regime-frequency')?.value
            };

            try {
                await this.addSupplement(supplementData);
                regimeForm.reset();
                this.showNotification('Supplement added to regime!', 'success');
            } catch (error) {
                this.showNotification(error.message, 'error');
            }
        });
    }

    // Show notification
    showNotification(message, type) {
        // Use the same notification system from app-simple.js
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed; top: 80px; right: 20px; padding: 12px 20px; border-radius: 8px;
            color: white; font-weight: 500; z-index: 10000; animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            background: ${type === 'success' ? 'linear-gradient(135deg, #00C851, #00A846)' : 
                        type === 'error' ? 'linear-gradient(135deg, #dc3545, #c82333)' :
                        'linear-gradient(135deg, #FFB300, #FF8800)'};
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
}

// Global instance
const regimeManager = new RegimeManager();

// Make it globally available
window.regimeManager = regimeManager;

export default regimeManager;