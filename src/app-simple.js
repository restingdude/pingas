// Simple working version with database integration
import APIClient from './api-client.js';
import regimeManager from './regime-manager.js';

// Initialize API client
const apiClient = new APIClient();

// Game State (will be loaded from database)
let gameState = {
    stats: {
        energy: 50, focus: 50, longevity: 50, mood: 50, strength: 50, immunity: 50,
        'heart-health': 50, 'bone-health': 50, 'skin-health': 50, 'hair-health': 50,
        'joint-health': 50, 'gut-health': 50, 'liver-health': 50, 'hormonal-balance': 50,
        vision: 50, 'oral-health': 50, 'anti-inflammatory': 50
    },
    level: 1, xp: 0, streak: 0, lastActivity: null, achievements: [],
    dailyQuests: { morning: false, perfect: false, streak: false },
    regime: []
};

let personalData = {};

// Basic navigation function
function initNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            console.log('Switching to:', view);
            
            // Hide all views
            document.querySelectorAll('.view-container').forEach(v => {
                v.style.display = 'none';
                v.classList.remove('active');
            });
            
            // Show target view
            const target = document.getElementById(view + '-view');
            if (target) {
                target.style.display = 'block';
                target.classList.add('active');
            }
            
            // Update button states
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Personal data functions
async function savePersonalData() {
    const personalDataToSave = {
        name: document.getElementById('user-name')?.value || '',
        age: document.getElementById('user-age')?.value || '',
        gender: document.getElementById('user-gender')?.value || '',
        weight: document.getElementById('user-weight')?.value || '',
        height: document.getElementById('user-height')?.value || '',
        activity: document.getElementById('user-activity')?.value || 'moderate',
        goals: Array.from(document.querySelectorAll('.goal-checkbox input:checked')).map(cb => cb.value),
        conditions: Array.from(document.querySelectorAll('.condition-checkbox input:checked')).map(cb => cb.value),
        biomarkers: {
            vitd: document.getElementById('biomarker-vitd')?.value || '',
            hscrp: document.getElementById('biomarker-hscrp')?.value || '',
            hba1c: document.getElementById('biomarker-hba1c')?.value || '',
            cholesterol: document.getElementById('biomarker-cholesterol')?.value || '',
            rhr: document.getElementById('biomarker-rhr')?.value || '',
            sleep: document.getElementById('biomarker-sleep')?.value || ''
        },
        notes: document.getElementById('personal-notes')?.value || ''
    };
    
    try {
        const result = await apiClient.savePersonalData(personalDataToSave);
        personalData = result.personalData;
        showNotification('Personal profile saved!', 'success');
    } catch (error) {
        console.error('Error saving personal data:', error);
        showNotification('Error saving profile. Please try again.', 'error');
    }
}

async function loadPersonalData() {
    try {
        const result = await apiClient.getPersonalData();
        const data = result.personalData;
        
        if (!data || Object.keys(data).length === 0) return;
        
        personalData = data;
        
        // Load basic info
        if (document.getElementById('user-name')) document.getElementById('user-name').value = data.name || '';
        if (document.getElementById('user-age')) document.getElementById('user-age').value = data.age || '';
        if (document.getElementById('user-gender')) document.getElementById('user-gender').value = data.gender || '';
        if (document.getElementById('user-weight')) document.getElementById('user-weight').value = data.weight || '';
        if (document.getElementById('user-height')) document.getElementById('user-height').value = data.height || '';
        if (document.getElementById('user-activity')) document.getElementById('user-activity').value = data.activity || 'moderate';
        
        // Load goals
        if (data.goals) {
            document.querySelectorAll('.goal-checkbox input').forEach(cb => {
                cb.checked = data.goals.includes(cb.value);
            });
        }
        
        // Load conditions
        if (data.conditions) {
            document.querySelectorAll('.condition-checkbox input').forEach(cb => {
                cb.checked = data.conditions.includes(cb.value);
            });
        }
        
        // Load biomarkers
        if (data.biomarkers) {
            Object.entries(data.biomarkers).forEach(([key, value]) => {
                const element = document.getElementById(`biomarker-${key}`);
                if (element) element.value = value || '';
            });
        }
        
        // Load notes
        if (document.getElementById('personal-notes')) document.getElementById('personal-notes').value = data.notes || '';
    } catch (error) {
        console.error('Error loading personal data:', error);
    }
}

async function clearPersonalData() {
    if (confirm('Are you sure you want to clear all personal data? This cannot be undone.')) {
        try {
            await apiClient.clearPersonalData();
            personalData = {};
            
            // Clear all form fields
            document.querySelectorAll('#personal-view input, #personal-view select, #personal-view textarea').forEach(field => {
                if (field.type === 'checkbox') {
                    field.checked = false;
                } else {
                    field.value = '';
                }
            });
            
            showNotification('Personal data cleared', 'info');
        } catch (error) {
            console.error('Error clearing personal data:', error);
            showNotification('Error clearing data. Please try again.', 'error');
        }
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 80px; right: 20px; padding: 12px 20px; border-radius: 8px;
        color: white; font-weight: 500; z-index: 10000; animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        background: ${type === 'success' ? 'linear-gradient(135deg, #00C851, #00A846)' : 
                    type === 'info' ? 'linear-gradient(135deg, #33B5E5, #0099CC)' :
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

// Initialize app
export async function initializeApp() {
    console.log('App initializing with database integration...');
    initNavigation();
    
    // Load data from database
    try {
        const gameResult = await apiClient.getGameState();
        gameState = gameResult.gameState;
        console.log('Game state loaded from database');
    } catch (error) {
        console.error('Error loading game state:', error);
        showNotification('Using offline mode - some features may be limited', 'info');
    }
    
    // Setup personal data event listeners
    setTimeout(async () => {
        const saveBtn = document.getElementById('save-personal');
        if (saveBtn) {
            saveBtn.addEventListener('click', savePersonalData);
        }
        
        const clearBtn = document.getElementById('clear-personal');
        if (clearBtn) {
            clearBtn.addEventListener('click', clearPersonalData);
        }
        
        // Load existing personal data
        await loadPersonalData();
        
        // Initialize regime manager
        await regimeManager.init();
    }, 100);
    
    console.log('App initialization complete');
}