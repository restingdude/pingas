// Simple working version with database integration
import APIClient from './api-client.js';
import regimeManager from './regime-manager.js';
import supplementSearch from './supplement-search.js';
import sweetAI from './sweet-ai.js';
import { getSupplementByKey, calculateSupplementEffects } from './supplement-database.js';
import { calculateStatBoosts } from './micronutrient-database.js';

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
    regime: []
};

let personalData = {};

// Calculate years, months, and days alive from date of birth
function calculateTimeAlive(dateOfBirth) {
    if (!dateOfBirth) return null;
    
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    
    // Check if valid date
    if (isNaN(birthDate.getTime()) || birthDate > today) return null;
    
    // Calculate years, months, and days
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    // Adjust if needed
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return { years, months, days };
}

// Update time alive display
function updateTimeAliveDisplay() {
    const timeAliveElement = document.querySelector('.days-alive-number');
    if (!timeAliveElement) return;
    
    const dob = personalData.dob || document.getElementById('user-dob')?.value;
    if (dob) {
        const timeAlive = calculateTimeAlive(dob);
        if (timeAlive !== null) {
            const { years, months, days } = timeAlive;
            timeAliveElement.textContent = `${years}y ${months}m ${days}d`;
        } else {
            timeAliveElement.textContent = '-';
        }
    } else {
        timeAliveElement.textContent = '-';
    }
}

// Basic navigation function
function initNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            console.log('Switching to:', view);
            
            // Save current tab to localStorage
            localStorage.setItem('currentTab', view);
            
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
            
            // Update stats display if stats view is being shown
            if (view === 'stats') {
                setTimeout(() => updateStatsDisplay(), 50);
            }
        });
    });
}

// Personal data functions
async function savePersonalData() {
    console.log('Save button clicked - starting save process');
    
    const personalDataToSave = {
        name: document.getElementById('user-name')?.value || '',
        dob: document.getElementById('user-dob')?.value || '',
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
    
    console.log('Personal data to save:', personalDataToSave);
    
    try {
        const result = await apiClient.savePersonalData(personalDataToSave);
        console.log('Save result:', result);
        personalData = result.personalData;
        updateTimeAliveDisplay(); // Update time alive when personal data is saved
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
        if (document.getElementById('user-dob')) document.getElementById('user-dob').value = data.dob || '';
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
        
        // Update time alive display after loading data
        updateTimeAliveDisplay();
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

// Stat descriptions for the modal
const STAT_DESCRIPTIONS = {
    'energy': 'Your overall vitality and physical stamina throughout the day.',
    'focus': 'Mental clarity, concentration, and cognitive performance.',
    'longevity': 'Cellular health and long-term wellbeing indicators.',
    'mood': 'Emotional balance, stress resilience, and mental wellbeing.',
    'strength': 'Physical power, muscle health, and athletic performance.',
    'immunity': 'Immune system strength and disease resistance.',
    'heart-health': 'Cardiovascular function and circulation health.',
    'bone-health': 'Bone density, strength, and skeletal system health.',
    'skin-health': 'Skin appearance, elasticity, and dermatological wellness.',
    'hair-health': 'Hair strength, growth, and follicle health.',
    'joint-health': 'Joint mobility, flexibility, and cartilage health.',
    'gut-health': 'Digestive system function and microbiome balance.',
    'liver-health': 'Liver function, detoxification, and metabolic processing.',
    'hormonal-balance': 'Endocrine system balance and hormone regulation.',
    'vision': 'Eye health, visual acuity, and ocular function.',
    'oral-health': 'Dental and gum health, oral hygiene.',
    'anti-inflammatory': 'Body\'s ability to manage inflammation and oxidative stress.'
};

// Show stat details modal
function showStatDetails(statName) {
    const modal = document.getElementById('stat-details-modal');
    const title = document.getElementById('stat-modal-title');
    const currentDisplay = document.getElementById('stat-current-display');
    const supplementsList = document.getElementById('affecting-supplements-list');
    const description = document.getElementById('stat-description');
    
    if (!modal || !regimeManager) return;
    
    // Set title
    const displayName = statName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    title.textContent = displayName;
    
    // Set current value
    const baseValue = gameState.stats[statName] || 50;
    const boost = Math.round(regimeManager.expectedBoosts[statName] || 0);
    const finalValue = Math.min(100, baseValue + boost);
    
    if (boost > 0) {
        currentDisplay.innerHTML = `${finalValue}/100 <span class="stat-boost">+${boost}</span>`;
    } else {
        currentDisplay.textContent = `${finalValue}/100`;
    }
    
    // Find supplements affecting this stat
    const affectingSupplements = [];
    regimeManager.regime.forEach(item => {
        // Calculate effects for this supplement
        let effects = {};
        const supplementInfo = getSupplementByKey(item.supplement);
        
        if (supplementInfo) {
            effects = calculateSupplementEffects(item.supplement, item.dosage, item.unit);
        } else {
            effects = calculateStatBoosts(item.supplement, item.dosage, item.unit);
        }
        
        if (effects[statName] && effects[statName] > 0) {
            affectingSupplements.push({
                name: item.productName || supplementInfo?.name || item.supplement,
                dosage: `${item.dosage} ${item.unit}`,
                boost: Math.round(effects[statName])
            });
        }
    });
    
    // Populate supplements list
    if (affectingSupplements.length > 0) {
        supplementsList.innerHTML = affectingSupplements.map(supp => `
            <div class="supplement-effect-item">
                <div class="supplement-name">${supp.name}</div>
                <div class="supplement-dosage">${supp.dosage}</div>
                <div class="supplement-boost">+${supp.boost} boost</div>
            </div>
        `).join('');
    } else {
        supplementsList.innerHTML = '<div class="no-supplements-affecting">No supplements in your regime currently affect this stat.</div>';
    }
    
    // Set description
    description.textContent = STAT_DESCRIPTIONS[statName] || 'Health metric tracked by the system.';
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Setup stat modal event listeners
function setupStatModalListeners() {
    const modal = document.getElementById('stat-details-modal');
    const closeBtn = document.querySelector('.stat-modal-close');
    
    if (!modal || !closeBtn) return;
    
    // Close modal function
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    };
    
    // Close button
    closeBtn.addEventListener('click', closeModal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Add click listeners to stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const statName = card.dataset.stat;
            if (statName) {
                showStatDetails(statName);
            }
        });
    });
}

// Update stats display with regime boosts
export function updateStatsDisplay() {
    // Get expected boosts from regime manager
    const boosts = regimeManager.expectedBoosts || {};
    
    // Update each stat card
    document.querySelectorAll('.stat-card').forEach(card => {
        const statName = card.dataset.stat;
        const baseValue = gameState.stats[statName] || 50;
        const boost = Math.round(boosts[statName] || 0);
        const finalValue = Math.min(100, baseValue + boost);
        
        // Update the stat display
        const statFill = card.querySelector('.stat-fill');
        const statValue = card.querySelector('.stat-value');
        
        if (statFill && statValue) {
            statFill.style.width = `${finalValue}%`;
            
            if (boost > 0) {
                statValue.innerHTML = `${finalValue}/100 <span class="stat-boost">+${boost}</span>`;
                card.classList.add('boosted');
            } else {
                statValue.textContent = `${finalValue}/100`;
                card.classList.remove('boosted');
            }
        }
    });
}

// Initialize app
export async function initializeApp() {
    console.log('App initializing with database integration...');
    
    // Restore the previously selected tab immediately (before navigation setup to avoid flash)
    const savedTab = localStorage.getItem('currentTab') || 'stats';
    
    // Hide all views first
    document.querySelectorAll('.view-container').forEach(v => {
        v.style.display = 'none';
        v.classList.remove('active');
    });
    
    // Show the correct view immediately
    const targetView = document.getElementById(savedTab + '-view');
    if (targetView) {
        targetView.style.display = 'block';
        targetView.classList.add('active');
    }
    
    // Set the correct nav button as active
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.nav-btn[data-view="${savedTab}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Now initialize navigation (event listeners)
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
        
        // Add event listener to DOB field for real-time updates
        const dobInput = document.getElementById('user-dob');
        if (dobInput) {
            dobInput.addEventListener('change', updateTimeAliveDisplay);
        }
        
        // Initialize regime manager, supplement search, and Sweet AI
        await regimeManager.init();
        supplementSearch.init();
        sweetAI.init();
        
        // Update stats display after regime is loaded
        updateStatsDisplay();
        
        // Setup stat modal listeners
        setupStatModalListeners();
    }, 100);
    
    console.log('App initialization complete');
}